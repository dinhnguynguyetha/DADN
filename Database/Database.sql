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

-- 4. Bảng Tiêu chuẩn: Ổ lăn 
CREATE TABLE std_bearings (
    bearing_id INT AUTO_INCREMENT PRIMARY KEY,
    bearing_code VARCHAR(50) NOT NULL UNIQUE,
    bearing_type VARCHAR(50) NOT NULL,
    d_inner FLOAT NOT NULL,
    D_outer FLOAT NOT NULL,
    B_width FLOAT NOT NULL,
    C_dynamic FLOAT NOT NULL,
    C0_static FLOAT NOT NULL
);

-- 5. Bảng Tiêu chuẩn: Thông số Bánh răng 
CREATE TABLE std_gear_params (
    param_id INT AUTO_INCREMENT PRIMARY KEY,
    gear_type VARCHAR(50) NOT NULL,
    Z_H FLOAT NOT NULL,
    K_H_beta FLOAT NOT NULL
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
    
    -- Khoảng cách trục aw
    center_distance FLOAT GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(geometry_matrix, '$.aw'))) STORED,                  

    -- Module m
    module FLOAT GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(geometry_matrix, '$.module_m'))) STORED,                           
    
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
    bearing_id INT
    
    -- Chứa các lực tác dụng F_t, F_r, F_a tại các tiết diện
    forces_matrix JSON,                     
    
    -- Chứa đường kính d1, d2, d3...
    diameters JSON,                         
    
    -- Chứa hệ số an toàn tĩnh/mỏi s, s_sigma, s_tau
    safety_factors JSON,                    
    
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (shaft_material_id) REFERENCES std_materials(material_id) ON DELETE RESTRICT
    FOREIGN KEY (bearing_id) REFERENCES std_bearings(bearing_id) ON DELETE SET NULL
);

-- ==============================================================================
-- PHẦN 4: NẠP DỮ LIỆU TỪ SÁCH PDF VÀO BẢNG DANH MỤC
-- ==============================================================================
-- 1. Bổ sung data cho bảng std_bearings (Trích xuất từ Phụ lục Ổ lăn)
-- Thông số: Ký hiệu, Loại ổ, d (mm), D (mm), B (mm), C (kN), C0 (kN)
INSERT INTO std_bearings (bearing_code, bearing_type, d_inner, D_outer, B_width, C_dynamic, C0_static) VALUES
-- Cỡ nhẹ (Series 2)
('205', 'Bi đỡ cỡ nhẹ', 25, 52, 15, 14.0, 7.85),
('206', 'Bi đỡ cỡ nhẹ', 30, 62, 16, 19.5, 11.2),
('207', 'Bi đỡ cỡ nhẹ', 35, 72, 17, 25.5, 15.2),
('208', 'Bi đỡ cỡ nhẹ', 40, 80, 18, 32.0, 17.8),
('209', 'Bi đỡ cỡ nhẹ', 45, 85, 19, 33.2, 18.6),
('210', 'Bi đỡ cỡ nhẹ', 50, 90, 20, 35.1, 19.8),
-- Cỡ trung (Series 3)
('305', 'Bi đỡ cỡ trung', 25, 62, 17, 22.5, 11.4),
('306', 'Bi đỡ cỡ trung', 30, 72, 19, 28.1, 14.6),
('307', 'Bi đỡ cỡ trung', 35, 80, 21, 33.2, 18.0),
('308', 'Bi đỡ cỡ trung', 40, 90, 23, 41.0, 22.4),
('309', 'Bi đỡ cỡ trung', 45, 100, 25, 52.7, 31.8),
('310', 'Bi đỡ cỡ trung', 50, 110, 27, 61.8, 38.0);

-- 2. Bổ sung data cho bảng std_gear_params (Trích xuất từ Chương Tính toán Bánh răng)
-- Thông số: Loại răng, Z_H (Hệ số hình dáng), K_H_beta (Hệ số tập trung tải trọng sơ bộ)
INSERT INTO std_gear_params (gear_type, Z_H, K_H_beta) VALUES
('Răng thẳng', 1.76, 1.05),
('Răng nghiêng', 1.71, 1.03),
('Răng chữ V', 1.71, 1.01);

-- Chèn dữ liệu danh mục Động cơ điện
INSERT INTO std_motors (motor_code, power_kw, sync_rpm, actual_rpm) VALUES
('DK 42-2', 2.8, 3000, 2900),
('K112M2', 3.0, 3000, 2900),
('4A90L2Y3', 3.0, 3000, 2900),
('DK 52-4', 7.0, 1500, 1450),
('K160S4', 7.5, 1500, 1450),
('4A132S4Y3', 7.5, 1500, 1450),
('K132M4', 5.5, 1500, 1445);

-- Chèn dữ liệu danh mục Vật liệu cơ khí
-- Lưu ý: Đối với thép 20X, độ cứng HRC 46-53 được quy đổi tương đối khoảng HB 440-514 để thống nhất kiểu dữ liệu.
INSERT INTO std_materials (material_name, sigma_b, sigma_ch, hardness_hb_min, hardness_hb_max) VALUES
('Thép 45 tôi cải thiện', 750, 450, 192, 240),
('Thép 40X tôi cải thiện', 850, 550, 230, 260),
('Thép 35XM tôi cải thiện', 900, 800, 241, 269),
('Thép 20X thấm cacbon', 650, 400, 440, 514);
