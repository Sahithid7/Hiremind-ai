import enum
from datetime import date

from sqlalchemy import Date, Enum, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.mixins import TimestampMixin


class ApplicationStatus(str, enum.Enum):
    applied = "Applied"
    online_assessment = "OA"
    interview = "Interview"
    rejected = "Rejected"
    offer = "Offer"


class JobApplication(TimestampMixin, Base):
    __tablename__ = "job_applications"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    company: Mapped[str] = mapped_column(String(180), nullable=False)
    role_title: Mapped[str] = mapped_column(String(180), nullable=False)
    location: Mapped[str | None] = mapped_column(String(180))
    job_url: Mapped[str | None] = mapped_column(String(500))
    status: Mapped[ApplicationStatus] = mapped_column(
        Enum(
            ApplicationStatus,
            name="application_status",
            values_callable=lambda statuses: [status.value for status in statuses],
        ),
        default=ApplicationStatus.applied,
        nullable=False,
    )
    applied_on: Mapped[date | None] = mapped_column(Date)
    next_step_date: Mapped[date | None] = mapped_column(Date)
    interview_round: Mapped[str | None] = mapped_column(String(120))
    notes: Mapped[str | None] = mapped_column(Text)

    user = relationship("User", back_populates="job_applications")
