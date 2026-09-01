from fastapi import APIRouter, UploadFile, File
import cv2
import numpy as np

router = APIRouter()


@router.post("/scan")
async def scan_image(file: UploadFile = File(...)):
    contents = await file.read()

    image = cv2.imdecode(
        np.frombuffer(contents, np.uint8),
        cv2.IMREAD_COLOR
    )

    if image is None:
        return {"error": "Invalid image"}

    height, width = image.shape[:2]

    return {
        "filename": file.filename,
        "width": width,
        "height": height,
        "message": "Image received successfully"
    }