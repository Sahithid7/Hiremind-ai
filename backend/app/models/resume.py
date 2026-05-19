from sqlalchemy import ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.mixins import TimestampMixin


class Resume(TimestampMixin, Base):
    __tablename__ = "resumes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    original_filename: Mapped[str] = mapped_column(String(255), nullable=False)
    stored_filename: Mapped[str] = mapped_column(String(255), nullable=False)
    content_type: Mapped[str] = mapped_column(String(120), nullable=False)
    parsed_text: Mapped[str | None] = mapped_column(Text)
    extracted_skills: Mapped[list[str] | None] = mapped_column(JSON)
    extracted_experience: Mapped[list[dict] | None] = mapped_column(JSON)
    extracted_education: Mapped[list[dict] | None] = mapped_column(JSON)
    extracted_projects: Mapped[list[dict] | None] = mapped_column(JSON)

    user = relationship("User", back_populates="resumes")
    analyses = relationship("ResumeAnalysis", back_populates="resume", cascade="all, delete-orphan")


class ResumeAnalysis(TimestampMixin, Base):
    __tablename__ = "resume_analysis"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    resume_id: Mapped[int] = mapped_column(ForeignKey("resumes.id", ondelete="CASCADE"), index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    ats_score: Mapped[int | None] = mapped_column(Integer)
    summary: Mapped[str | None] = mapped_column(Text)
    strengths: Mapped[list[str] | None] = mapped_column(JSON)
    weaknesses: Mapped[list[str] | None] = mapped_column(JSON)
    recommendations: Mapped[list[str] | None] = mapped_column(JSON)
    missing_keywords: Mapped[list[str] | None] = mapped_column(JSON)
    rewritten_bullets: Mapped[list[dict] | None] = mapped_column(JSON)
    raw_ai_response: Mapped[dict | None] = mapped_column(JSON)

    resume = relationship("Resume", back_populates="analyses")
