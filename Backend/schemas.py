from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

# ==========================================
# PHẦN 1: DỮ LIỆU ĐẦU VÀO (TỪ InputsStep.tsx)
# ==========================================
class WorkConditionsSchema(BaseModel):
    application_type: str = Field(..., description="Loại ứng dụng (VD: conveyor, mixer)")
    working_hours: float = Field(..., description="Số giờ làm việc/ngày")
    load_type: str = Field(..., description="Đặc tính tải (uniform, moderate, heavy)")
    environment: str = Field(..., description="Môi trường làm việc")
    temperature: float = Field(..., description="Nhiệt độ môi trường")

class ProjectCreateSchema(BaseModel):
    user_id: int
    project_name: str
    designer: str

class FlowInputSchema(BaseModel):
    power_requirement: float
    output_torque: float
    output_speed: float
    design_life: int
    work_conditions: WorkConditionsSchema

# ==========================================
# PHẦN 2: THÔNG SỐ TÍNH TOÁN (TỪ GearDesign.tsx)
# ==========================================
class CalculationInputSchema(BaseModel):
    power: float = Field(..., gt=0, description="Công suất kW")
    speed: float = Field(..., gt=0, description="Tốc độ đầu vào vg/ph")
    transmission_ratio: float = Field(..., gt=0, description="Tỉ số truyền i")
    
    # Cờ cho phép người dùng ghi đè vật liệu gợi ý từ Q-Learning
    material_override: bool = False
    selected_material: Optional[str] = None

class AuthRegisterSchema(BaseModel):
    username: str = Field(..., min_length=3, max_length=100)
    email: str = Field(..., max_length=100)
    password: str = Field(..., min_length=6)

class AuthLoginSchema(BaseModel):
    email: str
    password: str

class AuthResponseSchema(BaseModel):
    user_id: int
    username: str
    email: str

    class Config:
        from_attributes = True