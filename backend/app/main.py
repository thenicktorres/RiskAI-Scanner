from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.routes.scan import router as scan_router
import os

load_dotenv()

app = FastAPI(
    title="RiskAI-Scanner",
    description="AI-Powered Security Risk Assessment Tool",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scan_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "RiskAI-Scanner API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}