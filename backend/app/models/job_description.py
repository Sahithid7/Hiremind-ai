from sqlalchemy import ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.mixins import TimestampMixin


class JobDescription(TimestampMixin, Base):
    __tablename__ = "job_descriptions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(180), nullable=False)
    company: Mapped[str | None] = mapped_column(String(180))
    source_url: Mapped[str | None] = mapped_column(String(500))
    description_text: Mapped[str] = mapped_column(Text, nullable=False)
    extracted_keywords: Mapped[list[str] | None] = mapped_column(JSON)
    match_score: Mapped[int | None] = mapped_column(Integer)
    missing_skills: Mapped[list[str] | None] = mapped_column(JSON)
    match_recommendations: Mapped[list[str] | None] = mapped_column(JSON)

    user = relationship("User", back_populates="job_descriptions")
