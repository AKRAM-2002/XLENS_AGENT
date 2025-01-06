# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import fact_check, sentiment_analysis, generate

app = FastAPI(title="Truth Terminal API")

# CORS origins
origins = [
    "http://localhost:3000",  # Assuming your frontend runs on this port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fact_check.router, prefix="/api", tags=["fact-check"])
app.include_router(sentiment_analysis.router, prefix="/api", tags=["sentiment-analysis"])
app.include_router(generate.router, prefix="/api", tags=["tweet-generation"])