"""
RESQ — Intelligent Disaster Relief Resource Allocation
FastAPI Backend Application Entrypoint
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="RESQ Emergency Response Center API",
    description="Backend API and WebSocket relays for dynamic disaster-response triage, routing, and verifiable allocation.",
    version="1.0.0",
)

# CORS configuration for frontend development
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "system": "RESQ Intelligent Disaster Relief API",
        "status": "online",
        "version": "1.0.0",
        "zone": "Mumbai Emergency Command Hub",
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "telemetry_stream": "active",
        "optimizer_engine": "ready",
        "ledger_sync": "synced",
    }


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
