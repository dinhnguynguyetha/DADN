import numpy as np

class MaterialQLearningAgent:
    def __init__(self, materials_db, learning_rate=0.1, discount_factor=0.9):
        self.materials = materials_db # Chứa các bản ghi từ bảng std_materials
        self.alpha = learning_rate
        self.gamma = discount_factor
        self.q_table = {} # Key: State tuple, Value: Dict of Actions

    def get_state(self, torque, rpm, sigma_H_calc, sigma_F_calc):
        # Rời rạc hóa (discretize) trạng thái để đưa vào Q-Table
        return (round(torque, 1), round(rpm), round(sigma_H_calc), round(sigma_F_calc))

    def calculate_reward(self, sigma_H_calc, sigma_F_calc, material_action):
        sigma_H_allow = material_action['sigma_H_allow'] # Tính từ độ cứng HB của vật liệu
        sigma_F_allow = material_action['sigma_ch']      # Giới hạn chảy
        cost_factor = material_action['cost_factor']     # Hệ số giá thành C_a
        
        # Hàm phần thưởng theo công thức: R = w / C_a nếu thoả mãn, ngược lại -∞
        if sigma_H_calc <= sigma_H_allow and sigma_F_calc <= sigma_F_allow:
            return 100.0 / cost_factor 
        return -float('inf') # Penalty phá hủy mỏi

    def choose_optimal_material(self, state, q_table_storage=None):
        # Triển khai Bellman Equation để query ra vật liệu tốt nhất 
        # (Thép 45, Thép 40X, Thép 20CrMnTi...)
        # Trả về ID vật liệu và các thông số cho Frontend hiển thị
        
        # Simple implementation: choose the material with highest reward
        best_material = None
        best_reward = -float('inf')
        sigma_H_calc = state[2]
        sigma_F_calc = state[3]
        
        for material in self.materials:
            reward = self.calculate_reward(sigma_H_calc, sigma_F_calc, material)
            if reward > best_reward:
                best_reward = reward
                best_material = material
        
        return best_material if best_material else self.materials[0]  # fallback