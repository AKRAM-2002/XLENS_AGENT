# backend/app/api/endpoints/generate.py
from fastapi import APIRouter, HTTPException
from app.api.models.schemas import (
    TweetGenerationRequest, 
    GenerationResponse,
    TrendingTopic
)
from app.services.crew_manager import CrewManager
from typing import List, Optional

router = APIRouter()
crew_manager = CrewManager()

@router.post("/generate", response_model=GenerationResponse)
async def generate_tweet(request: TweetGenerationRequest):
    """
    Generate a viral tweet based on given parameters.
    
    Args:
        topic: Main topic for the tweet
        tone: Desired emotional tone
        target_audience: Intended audience
        
    Returns:
        GenerationResponse containing the generated tweet and engagement metrics
    """
    try:
        result = await crew_manager.generate_viral_tweet(
            request.topic,
            request.tone,
            request.target_audience
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating tweet: {str(e)}"
        )

# @router.post("/generate-batch")
# async def generate_multiple_tweets(
#     request: TweetGenerationRequest,
#     count: int = 3
# ):
#     """
#     Generate multiple tweet variations for the same parameters.
    
#     Args:
#         request: Tweet generation parameters
#         count: Number of variations to generate (default: 3)
        
#     Returns:
#         List of GenerationResponse objects
#     """
#     try:
#         crew_manager = CrewManager()
#         results = []
#         for _ in range(count):
#             result = await crew_manager.generate_viral_tweet(request.topic, request.tone, request.target_audience)
#             results.append(result.dict())
#         return {"tweets": results}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error generating multiple tweets: {str(e)}")
@router.post("/generate-batch")
async def generate_batch_tweets(request: TweetGenerationRequest, count: int = 3):
    try:
        crew_manager = CrewManager()
        results = await crew_manager.generate_batch_tweets(request.topic, request.tone, request.target_audience, count)
        return {"tweets": [r.dict() for r in results]}
    except Exception as e:
        print(f"Batch generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating multiple tweets: {str(e)}")

@router.get("/trending-topics", response_model=List[TrendingTopic])
async def get_trending_topics():
    """
    Get current trending topics for tweet generation.
    
    Returns:
        List of trending topics with engagement metrics
    """
    # Placeholder for trending topics integration
    return [
        TrendingTopic(topic="AI Technology", engagement_score=0.95),
        TrendingTopic(topic="Climate Action", engagement_score=0.88),
        TrendingTopic(topic="Remote Work", engagement_score=0.82)
    ]