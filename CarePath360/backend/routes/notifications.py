from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any, Optional

from database.demo_db import NOTIFICATIONS

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("", response_model=List[Dict[str, Any]])
def list_notifications(user_id: Optional[str] = None):
    if user_id:
        # Match user or general announcements
        return [n for n in NOTIFICATIONS if n["user_id"] == user_id or n["user_id"] == "all"]
    return NOTIFICATIONS

@router.post("/{notification_id}/read", response_model=Dict[str, Any])
def mark_notification_read(notification_id: str):
    for idx, n in enumerate(NOTIFICATIONS):
        if n["id"] == notification_id:
            NOTIFICATIONS[idx]["is_read"] = True
            return NOTIFICATIONS[idx]
    raise HTTPException(status_code=404, detail="Notification not found")

@router.post("/read-all", response_model=Dict[str, Any])
def mark_all_read(user_id: Optional[str] = None):
    for idx in range(len(NOTIFICATIONS)):
        if user_id is None or NOTIFICATIONS[idx]["user_id"] == user_id:
            NOTIFICATIONS[idx]["is_read"] = True
    return {"message": "All notifications marked as read"}
