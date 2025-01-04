# backend/app/main.py
from fastapi import FastAPI
from app.api.endpoints import analyze, generate

app = FastAPI(title="Truth Terminal API")

app.include_router(analyze.router)
app.include_router(generate.router)