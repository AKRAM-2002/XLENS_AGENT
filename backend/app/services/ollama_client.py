from crewai import LLM
from app.core.config import settings

class OllamaClient:
    def __init__(self):
        self.llm = LLM(model=settings.MODEL_NAME)

    def get_llm(self) -> LLM:
        return self.llm