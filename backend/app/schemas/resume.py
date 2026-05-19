from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ResumeRead(BaseModel):
    id: int
    original_filename: str
    content_type: str
    parsed_text: str | None
    extracted_skills: list[str] | None
    extracted_experience: list[dict] | None
    extracted_education: list[dict] | None
    extracted_projects: list[dict] | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ResumeUploadResponse(BaseModel):
    resume: ResumeRead
    message: str
