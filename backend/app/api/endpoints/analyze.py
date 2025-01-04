# backend/app/api/endpoints/analyze.py
from fastapi import APIRouter, HTTPException
from app.api.models.schemas import TweetAnalysisRequest, AnalysisResponse
from app.services.crew_manager import CrewManager

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_tweet(request: TweetAnalysisRequest):
    try:
        crew_manager = CrewManager()
        result = crew_manager.analyze_tweet(request.tweet_text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))