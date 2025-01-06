# backend/app/api/endpoints/sentiment_analysis.py
from fastapi import APIRouter, HTTPException
from app.api.models.schemas import SentimentRequest, SentimentResult
from app.services.crew_manager import CrewManager

router = APIRouter()

@router.post("/sentiment-analysis", response_model=SentimentResult)
async def sentiment_analyze_tweet(request: SentimentRequest):
    print(f"Received request for sentiment analysis: {request.tweet_text}")
    try:
        crew_manager = CrewManager()
        result = crew_manager.sentiment_analyze_tweet(request.tweet_text)
        print(f"Sentiment analysis result: {result}")
        return result
    except Exception as e:
        print(f"Error analyzing tweet sentiment: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error analyzing tweet sentiment: {str(e)}")