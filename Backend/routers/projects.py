from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update
import datetime

try:
    from Backend.database import get_db
    from Backend.models import Project
    from Backend.schemas import ProjectCreateSchema
except ImportError:
    try:
        from .database import get_db
        from .models import Project
        from .schemas import ProjectCreateSchema
    except ImportError:
        from database import get_db
        from models import Project
        from schemas import ProjectCreateSchema

router = APIRouter(prefix="/api/projects", tags=["Projects"])

@router.post("/", summary="Khởi tạo dự án mới")
async def create_project(payload: ProjectCreateSchema, db: AsyncSession = Depends(get_db)):
    new_project = Project(
        user_id=payload.user_id,
        project_name=payload.project_name,
        current_step="1_INPUTS",
        status="DRAFT",
        created_at=datetime.datetime.utcnow()
    )
    db.add(new_project)
    await db.commit()
    await db.refresh(new_project)
    return {"status": "success", "project_id": new_project.project_id}

@router.put("/{project_id}/step", summary="Cập nhật tiến độ Vertical Stepper")
async def update_project_step(project_id: int, target_step: str, db: AsyncSession = Depends(get_db)):
    """ API này gọi khi bấm 'Xác Nhận & Tiếp Tục' ở mỗi bước Frontend """
    valid_steps = ['1_INPUTS', '2_KINEMATICS', '3_TRANSMISSIONS', '4_SHAFTS', '5_COMPLETED']
    if target_step not in valid_steps:
        raise HTTPException(status_code=400, detail="Bước không hợp lệ")

    query = update(Project).where(Project.project_id == project_id).values(current_step=target_step)
    await db.execute(query)
    await db.commit()
    
    return {"message": f"Dự án đã chuyển sang bước {target_step}"}