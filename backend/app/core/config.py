from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def get_application():
    from app.core.settings import get_settings
    settings = get_settings()
    app = FastAPI(
        title=settings.PROJECT_NAME,
        openapi_url=f"{settings.API_V1_STR}/openapi.json"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app