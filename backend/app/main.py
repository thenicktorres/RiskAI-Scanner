from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="RiskAI Scanner API",
    description="API for the RiskAI Scanner application, providing endpoints for vulnerability scanning and reporting.",
    version="1.0.0",
)

# Allow the browser extension to talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "RiskAI Scanner API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
