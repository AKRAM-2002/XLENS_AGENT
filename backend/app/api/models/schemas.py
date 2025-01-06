from pydantic import BaseModel
from typing import Dict, List, Optional

"""
Defines Pydantic models for request/response validation
"""

class TweetAnalysisRequest(BaseModel):
    tweet_text: str
class FactCheckRequest(BaseModel):
    tweet_text: str
class FactCheckResult(BaseModel):
    accuracy_score: float
    verified_claims: List[str]
    unverified_claims: List[str]
    evidence: Dict[str, str]

class SentimentRequest(BaseModel):
    tweet_text: str
class SentimentResult(BaseModel):
    score: float
    tone: str
    emotional_triggers: List[str]
    potential_impact: str

class AnalysisResponse(BaseModel):
    fact_check: FactCheckResult
    sentiment: SentimentResult

class TweetGenerationRequest(BaseModel):
    topic: str
    tone: str
    target_audience: str

class GenerationResponse(BaseModel):
    tweet_text: str
    engagement_score: float
    hashtags: List[str]
    best_posting_time: str

class TrendingTopic(BaseModel):
    topic: str
    engagement_score: float