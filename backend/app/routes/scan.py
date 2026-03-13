from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai import analyze_scan

router = APIRouter()

class ScanRequest(BaseModel):
    answers: dict

@router.post("/scan")
async def run_scan(request: ScanRequest):
    try:
        result = analyze_scan(request.answers)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))