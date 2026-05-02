from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
try:
    from Backend.database import get_db
except ImportError:
    try:
        from .database import get_db
    except ImportError:
        from database import get_db

router = APIRouter(prefix="/api/exports", tags=["Exports"])

@router.get("/{project_id}/pdf")
async def export_technical_report(project_id: int, db: AsyncSession = Depends(get_db)):
    """
    Tạo Báo Cáo Kỹ Thuật Đầy Đủ (PDF)
    Sử dụng thư viện như ReportLab hoặc pdfkit để compile dữ liệu DB thành PDF
    """
    # 1. Fetch dữ liệu dự án, bánh răng, trục, ổ bi từ DB
    # 2. Render logic tạo PDF...
    
    import tempfile
    import os
    temp_dir = tempfile.gettempdir()
    file_path = os.path.join(temp_dir, f"mech_report_{project_id}.pdf")
    
    # Mocking việc ghi file
    with open(file_path, "w") as f:
        f.write("Báo Cáo Kỹ Thuật Chi Tiết Hộp Giảm Tốc")

    return FileResponse(
        path=file_path,
        filename=f"Bao_Cao_Ky_Thuat_{project_id}.pdf",
        media_type="application/pdf"
    )

@router.get("/{project_id}/excel")
async def export_bom_excel(project_id: int, db: AsyncSession = Depends(get_db)):
    """
    Tạo Bảng Kê Vật Tư Sản Xuất (Excel BOM)
    Sử dụng thư viện pandas hoặc openpyxl
    """
    import tempfile
    import os
    temp_dir = tempfile.gettempdir()
    file_path = os.path.join(temp_dir, f"mech_bom_{project_id}.xlsx")
    
    # Mocking tạo file excel
    with open(file_path, "wb") as f:
        f.write(b"Mock Excel Bytes")
        
    return FileResponse(
        path=file_path,
        filename=f"Bang_Ke_Vat_Tu_{project_id}.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )