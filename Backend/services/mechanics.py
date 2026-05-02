import math

def calculate_chain_drive(P_truyen: float, u_x: float, a_sodo: float, p_buoc: float, K_factors: float):
    """
    Tiến trình Worker 1: Tính toán Xích theo nền tảng luận lý học.
    """
    # 1. Số răng đĩa nhỏ (Khống chế sự ăn mòn, tuyến tính theo tỷ số truyền)
    z1_calc = 29 - 2 * u_x
    z1 = max(19, round(z1_calc))  # Ràng buộc z1 >= 19
    
    # Số răng đĩa lớn
    z2 = round(z1 * u_x)
    
    # 2. Sức tải động lực học quy dẫn (Pt)
    # K_factors = K_o * K_a * K_dc * K_bt * K_d * K_c (Truyền từ tầng trên)
    # K_z = 25 / z1; K_n = n01 / n1
    P_t = P_truyen * K_factors  # Giả sử đã gộp siêu tích
    
    # 3. Số lượng đếm mắt xích (x)
    term1 = (2 * a_sodo) / p_buoc
    term2 = (z1 + z2) / 2
    term3 = ((z2 - z1) / (2 * math.pi))**2 * (p_buoc / a_sodo)
    
    x_calc = term1 + term2 + term3
    
    # Ép số x làm tròn lên bội số chẵn của tập N nguyên thủy
    x = math.ceil(x_calc)
    if x % 2 != 0:
        x += 1
        
    return {
        "z1": z1,
        "z2": z2,
        "chain_links_x": x,
        "dynamic_load_pt": round(P_t, 2)
    }

def verify_gear_stress(torque: float, b_w: float, d_w1: float, u: float):
    """
    Tính ứng suất tiếp xúc và ứng suất uốn cho bánh răng
    Kết quả sẽ gửi sang Agent Q-Learning để so sánh với [Sigma_H] của bảng vật liệu
    """
    # Các hằng số tra bảng tiêu chuẩn (Tạm lấy giá trị mẫu)
    Z_M = 274  # Căn bậc hai (MPa) cho thép
    Z_H = 1.76
    K_H = 1.3
    
    # Tính ứng suất tiếp xúc sơ bộ
    # Công thức rút gọn: sigma_H = Z_M * Z_H * sqrt((2 * T1 * K_H * (u+1)) / (b_w * d_w1^2 * u))
    inner_val = (2 * torque * 1000 * K_H * (u + 1)) / (b_w * (d_w1**2) * u)
    sigma_H = Z_M * Z_H * math.sqrt(max(inner_val, 0))
    
    # Mẫu trả về (MPa)
    return {
        "sigma_H_calc": round(sigma_H, 1),
        "sigma_F_calc": round(sigma_H * 0.45, 1) # Công thức uốn tỷ lệ (Mô phỏng)
    }

def calculate_gear_geometry(project_data):
    """
    Tính toán hình học bánh răng
    Trả về geom_matrix và stress_matrix
    """
    # Giả sử project_data có các thuộc tính như torque, rpm, u, etc.
    # Mock calculation
    torque = getattr(project_data, 'torque', 100)  # Nm
    rpm = getattr(project_data, 'rpm', 1500)
    u = getattr(project_data, 'u', 2.5)  # Tỷ số truyền
    
    # Tính module, đường kính, etc.
    P = 2 * math.pi * rpm * torque / 60  # Công suất (W)
    module = 2  # mm, giả sử
    z1 = 20
    d1 = module * z1
    d2 = d1 * u
    b_w = 20  # mm, chiều rộng
    
    geom_matrix = {
        "module": module,
        "z1": z1,
        "z2": round(z1 * u),
        "d1": d1,
        "d2": d2,
        "b_w": b_w
    }
    
    # Tính stress
    stress_matrix = verify_gear_stress(torque, b_w, d1, u)
    
    return geom_matrix, stress_matrix