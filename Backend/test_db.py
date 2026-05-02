import asyncio
try:
    from Backend.database import engine, Base
    from Backend.models import User
except ImportError:
    try:
        from .database import engine, Base
        from .models import User
    except ImportError:
        from database import engine, Base
        from models import User

async def test_db():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("Database tables created successfully")
    except Exception as e:
        print(f"Database error: {e}")

if __name__ == "__main__":
    asyncio.run(test_db())