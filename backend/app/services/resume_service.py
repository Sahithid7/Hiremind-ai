from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.resume import Resume
from app.models.user import User
from app.services.resume_parser import parse_resume_file

settings = get_settings()

ALLOWED_EXTENSIONS = {".pdf", ".docx"}
ALLOWED_CONTENT_TYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}


def list_resumes(db: Session, user: User) -> list[Resume]:
    statement = select(Resume).where(Resume.user_id == user.id).order_by(Resume.created_at.desc())
    return list(db.scalars(statement).all())


def get_resume(db: Session, user: User, resume_id: int) -> Resume:
    resume = db.get(Resume, resume_id)
    if resume is None or resume.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume not found.")
    return resume


async def create_resume_from_upload(db: Session, user: User, file: UploadFile) -> Resume:
    original_filename = Path(file.filename or "").name
    suffix = Path(original_filename).suffix.lower()
    if suffix not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Upload a PDF or DOCX resume.",
        )

    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file content type.",
        )

    contents = await file.read()
    max_size = settings.max_upload_size_mb * 1024 * 1024
    if len(contents) > max_size:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Resume must be smaller than {settings.max_upload_size_mb} MB.",
        )

    upload_dir = Path(settings.upload_dir)
    upload_dir.mkdir(parents=True, exist_ok=True)
    stored_filename = f"{user.id}_{uuid4().hex}{suffix}"
    stored_path = upload_dir / stored_filename
    stored_path.write_bytes(contents)

    try:
        parsed = parse_resume_file(stored_path)
    except Exception as exc:
        stored_path.unlink(missing_ok=True)
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Could not parse this resume. Try another PDF or DOCX file.",
        ) from exc

    resume = Resume(
        user_id=user.id,
        original_filename=original_filename,
        stored_filename=stored_filename,
        content_type=file.content_type or "application/octet-stream",
        parsed_text=parsed.text,
        extracted_skills=parsed.skills,
        extracted_experience=parsed.experience,
        extracted_education=parsed.education,
        extracted_projects=parsed.projects,
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)
    return resume
