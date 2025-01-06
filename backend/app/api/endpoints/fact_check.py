# backend/app/api/endpoints/fact_check.py
from fastapi import APIRouter, HTTPException
from app.api.models.schemas import FactCheckRequest, FactCheckResult
from app.services.crew_manager import CrewManager

router = APIRouter()

@router.post("/fact-check", response_model=FactCheckResult)
async def fact_check_tweet(request: FactCheckRequest):
    try:
        crew_manager = CrewManager()
        result = crew_manager.fact_check_tweet(request.tweet_text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fact-checking tweet: {str(e)}")