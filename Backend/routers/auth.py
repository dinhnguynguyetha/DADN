from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_
from sqlalchemy.exc import IntegrityError
from passlib.context import CryptContext

try:
    from Backend.database import get_db
    from Backend.models import User
    from Backend.schemas import AuthLoginSchema, AuthRegisterSchema, AuthResponseSchema
except ImportError:
    try:
        from .database import get_db
        from .models import User
        from .schemas import AuthLoginSchema, AuthRegisterSchema, AuthResponseSchema
    except ImportError:
        from database import get_db
        from models import User
        from schemas import AuthLoginSchema, AuthRegisterSchema, AuthResponseSchema

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, password_hash: str) -> bool:
    return pwd_context.verify(plain_password, password_hash)


@router.post("/register", response_model=AuthResponseSchema, summary="Đăng ký tài khoản mới")
async def register(payload: AuthRegisterSchema, db: AsyncSession = Depends(get_db)):
    existing_user = await db.execute(
        select(User).where(or_(User.email == payload.email, User.username == payload.username))
    )
    if existing_user.scalar_one_or_none() is not None:
        raise HTTPException(status_code=400, detail="Email hoặc tên người dùng đã tồn tại")

    user = User(
        username=payload.username,
        email=payload.email,
        password_hash=hash_password(payload.password)
    )
    db.add(user)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Email hoặc tên người dùng đã tồn tại")
    await db.refresh(user)

    return AuthResponseSchema.from_orm(user)


@router.post("/login", response_model=AuthResponseSchema, summary="Đăng nhập bằng email và mật khẩu")
async def login(payload: AuthLoginSchema, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Email hoặc mật khẩu không hợp lệ")

    return AuthResponseSchema.from_orm(user)
