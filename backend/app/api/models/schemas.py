from pydantic import BaseModel
from typing import Dict, List, Optional

class TweetAnalysisRequest(BaseModel):
    tweet_text: str

class TweetGenerationRequest(BaseModel):
    topic: str
    tone: str
    target_audience: str

class FactCheckResult(BaseModel):
    accuracy_score: float
    verified_claims: List[str]
    unverified_claims: List[str]
    evidence: Dict[str, str]

class SentimentResult(BaseModel):
    score: float
    tone: str
    emotional_triggers: List[str]
    potential_impact: str

class AnalysisResponse(BaseModel):
    fact_check: FactCheckResult
    sentiment: SentimentResult

class GenerationResponse(BaseModel):
    tweet: str
    metrics: Optional[Dict[str, float]]