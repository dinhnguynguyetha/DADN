import asyncio
try:
    from Backend.services.mechanics import calculate_gear_geometry, calculate_chain_drive
    from Backend.services.q_learning import MaterialQLearningAgent
except ImportError:
    try:
        from .mechanics import calculate_gear_geometry, calculate_chain_drive
        from .q_learning import MaterialQLearningAgent
    except ImportError:
        from services.mechanics import calculate_gear_geometry, calculate_chain_drive
        from services.q_learning import MaterialQLearningAgent
async def get_materials(db_session):
    """Mock function to get materials from DB"""
    # Mock data for materials
    return [
        {"id": 1, "name": "Thép 45", "sigma_H_allow": 800, "sigma_ch": 600, "cost_factor": 1.0},
        {"id": 2, "name": "Thép 40X", "sigma_H_allow": 900, "sigma_ch": 700, "cost_factor": 1.2},
        {"id": 3, "name": "Thép 20CrMnTi", "sigma_H_allow": 1000, "sigma_ch": 800, "cost_factor": 1.5}
    ]
async def run_gear_calculation_thread(project_data, db_session):
    """Luồng A: Xử lý tính toán Bánh răng và gọi Q-Learning"""
    # 1. Tính toán sơ bộ hình học và ứng suất
    geom_matrix, stress_matrix = calculate_gear_geometry(project_data)
    
    # 2. Chạy Q-Learning để truy vấn Database (std_materials) và chọn mác thép
    agent = MaterialQLearningAgent(materials_db=await get_materials(db_session))
    state = agent.get_state(project_data.torque, project_data.rpm, stress_matrix['sigma_H'], stress_matrix['sigma_F'])
    best_material = agent.choose_optimal_material(state)
    
    return {"module": geom_matrix, "material": best_material, "stress": stress_matrix}

async def run_chain_calculation_thread(project_data):
    """Luồng B: Xử lý tính toán Xích"""
    # Xử lý các hệ số điều kiện ngặt nghèo của xích theo lý thuyết K = K_o * K_a ...
    chain_matrix = calculate_chain_drive(project_data)
    return chain_matrix

async def execute_parallel_calculations(project_data, db_session):
    """Máy chủ Điều phối - Gộp 2 luồng tính toán"""
    # Thực thi song song để tối ưu I/O và CPU Bound
    results = await asyncio.gather(
        run_gear_calculation_thread(project_data, db_session),
        run_chain_calculation_thread(project_data)
    )
    
    # Đồng bộ kết quả để chuyển tiếp sang bài toán tính Trục
    gear_result, chain_result = results
    return {
        "gears": gear_result,
        "chain": chain_result
    }