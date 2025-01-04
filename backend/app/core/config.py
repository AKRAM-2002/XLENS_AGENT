from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    MODEL_NAME: str = "ollama/phi3:3.8b"
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()