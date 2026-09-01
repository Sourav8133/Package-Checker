from fastapi import FastAPI
from backend.routes.scan import router as scan_router

app = FastAPI(title="Package Checker")

app.include_router(scan_router)


@app.get("/")
def home():
    return {
        "message": "Package Checker API is running"
    }