from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    """
    Handles config setting using Pydanctic's BaseSettings
    """
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Truth Terminal API"
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "ollama/phi3:3.8b"
    
    class Config:
        case_sensitive = True
        env_file = ".env"

@lru_cache()
def get_settings():
    """
    Improving performance by caching the settings object
    """
    return Settings()