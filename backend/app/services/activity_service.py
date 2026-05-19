from sqlalchemy.orm import Session

from app.models.activity_log import ActivityLog


def record_activity(
    db: Session,
    *,
    user_id: int,
    action: str,
    metadata: dict | None = None,
) -> ActivityLog:
    activity = ActivityLog(user_id=user_id, action=action, metadata_json=metadata)
    db.add(activity)
    db.commit()
    db.refresh(activity)
    return activity
