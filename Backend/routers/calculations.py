from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
try:
    from Backend.database import get_db
    from Backend.schemas import CalculationInputSchema
    from Backend.services.workers import execute_parallel_calculations
except ImportError:
    try:
        from .database import get_db
        from .schemas import CalculationInputSchema
        from .services.workers import execute_parallel_calculations
    except ImportError:
        from database import get_db
        from schemas import CalculationInputSchema
        from services.workers import execute_parallel_calculations

router = APIRouter(prefix="/api/calculations", tags=["Calculations"])

@router.post("/{project_id}/run")
async def trigger_calculations(
    project_id: int, 
    payload: CalculationInputSchema, 
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    try:
        # Trong thực tế quy mô lớn, ta sẽ đưa 'execute_parallel_calculations' vào background_tasks 
        # hoặc Celery worker và báo Frontend dùng WebSocket để lắng nghe.
        # Ở đây dùng await trực tiếp do quy mô tính toán nội bộ (đã async bên trong).
        
        final_results = await execute_parallel_calculations(payload, db)
        
        # Cập nhật DB: Bảng flow_gears, flow_shafts
        # Update project status = '3_TRANSMISSIONS'
        
        return {
            "status": "success",
            "message": "Tính toán hoàn tất",
            "data": final_results # Sẽ được Frontend render ở bảng [Thông Số Tính Toán & Kiểm Nghiệm]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))