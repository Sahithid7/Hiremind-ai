from typing import Annotated

from fastapi import APIRouter, Depends, File, UploadFile, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.resume import ResumeRead, ResumeUploadResponse
from app.services.activity_service import record_activity
from app.services.resume_service import create_resume_from_upload, get_resume, list_resumes

router = APIRouter(prefix="/resume", tags=["Resumes"])


@router.post("/upload", response_model=ResumeUploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_resume(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
    file: UploadFile = File(...),
) -> ResumeUploadResponse:
    resume = await create_resume_from_upload(db, current_user, file)
    record_activity(
        db,
        user_id=current_user.id,
        action="resume.uploaded",
        metadata={"resume_id": resume.id, "filename": resume.original_filename},
    )
    return ResumeUploadResponse(
        resume=ResumeRead.model_validate(resume),
        message="Resume uploaded and parsed successfully.",
    )


@router.get("", response_model=list[ResumeRead])
def read_resumes(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> list[ResumeRead]:
    return [ResumeRead.model_validate(resume) for resume in list_resumes(db, current_user)]


@router.get("/{resume_id}", response_model=ResumeRead)
def read_resume(
    resume_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> ResumeRead:
    return ResumeRead.model_validate(get_resume(db, current_user, resume_id))
