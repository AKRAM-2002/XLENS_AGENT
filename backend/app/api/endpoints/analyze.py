# backend/app/api/endpoints/analyze.py
from fastapi import APIRouter, HTTPException, Depends
from app.api.models.schemas import TweetAnalysisRequest, AnalysisResponse
from app.services.crew_manager import TruthTerminalCrew
from typing import Optional

router = APIRouter()
crew_manager = TruthTerminalCrew()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_tweet(request: TweetAnalysisRequest):
    """
    Analyze a tweet for factual accuracy and sentiment.
    
    Args:
        tweet_text: The tweet content to analyze
        
    Returns:
        AnalysisResponse containing fact-checking and sentiment analysis results
    """
    try:
        result = await crew_manager.analyze_tweet(request.tweet_text)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error analyzing tweet: {str(e)}"
        )

@router.get("/analysis-history")
async def get_analysis_history(limit: Optional[int] = 10):
    """
    Retrieve history of tweet analyses.
    
    Args:
        limit: Number of records to return (default: 10)
        
    Returns:
        List of previous analyses
    """
    try:
        # Placeholder for database integration
        return {"message": "Analysis history feature coming soon"}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching analysis history: {str(e)}"
        )