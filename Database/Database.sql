-- ==============================================================================
-- PHẦN 1:CÁC BẢNG ĐỘC LẬP (THỰC THỂ MẠNH) 
-- ==============================================================================

-- 1. Bảng Người dùng
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Tiêu chuẩn: Động cơ điện (Danh mục dùng chung)
CREATE TABLE std_motors (
    motor_id INT AUTO_INCREMENT PRIMARY KEY,
    motor_code VARCHAR(50) NOT NULL UNIQUE, -- VD: 'DK.51-4'
    power_kw FLOAT NOT NULL,                -- Công suất P_dc
    sync_rpm INT NOT NULL,                  -- Vòng quay đồng bộ
    actual_rpm INT NOT NULL                 -- Vòng quay thực tế
);

-- 3. Bảng Tiêu chuẩn: Vật liệu cơ khí (Danh mục dùng chung)
CREATE TABLE std_materials (
    material_id INT AUTO_INCREMENT PRIMARY KEY,
    material_name VARCHAR(100) NOT NULL,    -- VD: 'Thép 45 tôi cải thiện'
    sigma_b FLOAT NOT NULL,                 -- Giới hạn bền
    sigma_ch FLOAT NOT NULL,                -- Giới hạn chảy
    hardness_hb_min INT NOT NULL,           -- Độ cứng HB Min
    hardness_hb_max INT NOT NULL            -- Độ cứng HB Max
);

-- ==============================================================================
-- PHẦN 2: BẢNG QUẢN LÝ DỰ ÁN (CÓ CHỨA CỘT THEO DÕI TIẾN ĐỘ)
-- ==============================================================================

CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,                   -- Khóa ngoại 
    project_name VARCHAR(255) NOT NULL,
    
    -- Cột theo dõi tiến độ quy trình để khóa/mở các bước trên giao diện
    current_step ENUM(
        '1_INPUTS', 
        '2_KINEMATICS', 
        '3_TRANSMISSIONS', 
        '4_SHAFTS', 
        '5_COMPLETED'
    ) DEFAULT '1_INPUTS',
    
    status ENUM('DRAFT', 'DONE') DEFAULT 'DRAFT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Ràng buộc: Xóa User thì Xóa luôn Project của họ
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ==============================================================================
-- PHẦN 3: CÁC BẢNG LƯU TRÌNH TÍNH TOÁN (THỰC THỂ YẾU - QUAN HỆ 1:1 VỚI PROJECT)
-- ==============================================================================

-- BƯỚC 1: Thông số đầu vào
CREATE TABLE flow_inputs (
    project_id INT PRIMARY KEY,             -- PK kiêm FK 
    power_requirement FLOAT NOT NULL,       -- Công suất yêu cầu (kW)
    work_conditions JSON,                   -- Lưu JSON: { "ca_lam_viec": 2, "thoi_gian_Lh": 28800, "tai_va_dap": "nhe" }
    
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

-- BƯỚC 2: Tính Động học (Mượn 1 Khóa ngoại từ Động cơ)
CREATE TABLE flow_kinematics (
    project_id INT PRIMARY KEY,             -- PK kiêm FK 
    selected_motor_id INT NOT NULL,         -- FK (mượn từ STD_MOTORS)
    ratio_total FLOAT,                      -- Tỉ số truyền tổng
    ratio_chain FLOAT,                      -- Tỉ số truyền xích
    
    -- Lưu mảng thông số các trục [Công suất, Vòng quay, Momen] cho Trục I, II, III...
    kinematics_matrix JSON,                 
    
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (selected_motor_id) REFERENCES std_motors(motor_id) ON DELETE RESTRICT
);

-- BƯỚC 3: Tính Bánh răng (Mượn 2 Khóa ngoại từ Vật liệu)
CREATE TABLE flow_gears (
    project_id INT PRIMARY KEY,             -- PK kiêm FK 
    pinion_material_id INT NOT NULL,        -- FK Vật liệu Bánh dẫn 
    gear_material_id INT NOT NULL,          -- FK Vật liệu Bánh bị dẫn 
    
    center_distance FLOAT,                  -- Khoảng cách trục aw
    module FLOAT,                           -- Module m
    
    -- Chứa Z1, Z2, đường kính d1, d2, da1, da2...
    geometry_matrix JSON,                   
    
    -- Chứa các hệ số kiểm nghiệm ứng suất: K_H, Z_M, Z_H, sigma_H...
    stress_verification JSON,               
    
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (pinion_material_id) REFERENCES std_materials(material_id) ON DELETE RESTRICT,
    FOREIGN KEY (gear_material_id) REFERENCES std_materials(material_id) ON DELETE RESTRICT
);

-- BƯỚC 4: Tính Trục (Mượn 1 Khóa ngoại từ Vật liệu)
CREATE TABLE flow_shafts (
    project_id INT PRIMARY KEY,             -- PK kiêm FK
    shaft_material_id INT NOT NULL,         -- FK Vật liệu làm trục
    
    -- Chứa các lực tác dụng F_t, F_r, F_a tại các tiết diện
    forces_matrix JSON,                     
    
    -- Chứa đường kính d1, d2, d3...
    diameters JSON,                         
    
    -- Chứa hệ số an toàn tĩnh/mỏi s, s_sigma, s_tau
    safety_factors JSON,                    
    
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (shaft_material_id) REFERENCES std_materials(material_id) ON DELETE RESTRICT
);