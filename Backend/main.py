from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

try:
    from Backend.routers import projects, calculations, exports, auth
except ImportError:
    try:
        from routers import projects, calculations, exports, auth
    except ImportError:
        from .routers import projects, calculations, exports, auth

app = FastAPI(title="MechDesign Pro - API Gateway")

# Cho phép ReactJS (Frontend) gọi API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"], # Link ReactJS mặc định
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(calculations.router)
app.include_router(exports.router)
app.include_router(auth.router)

@app.get("/")
def health_check():
    return {"status": "Tác tử Async FastAPI đang hoạt động"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)