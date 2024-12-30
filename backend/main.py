# backend/main.py
from fastapi import FastAPI
from app.core.config import get_application
from app.api.endpoints import analyze, generate
from app.core.settings import get_settings

settings = get_settings()
app = get_application()

# Include routers
app.include_router(
    analyze.router,
    prefix=f"{settings.API_V1_STR}/tweets",
    tags=["Tweet Analysis"]
)

app.include_router(
    generate.router,
    prefix=f"{settings.API_V1_STR}/tweets",
    tags=["Tweet Generation"]
)

@app.get("/")
async def root():
    return {
        "app_name": settings.PROJECT_NAME,
        "docs_url": f"/docs",
        "openapi_url": f"{settings.API_V1_STR}/openapi.json"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)