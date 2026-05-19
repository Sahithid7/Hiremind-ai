from app.database.base import Base
from app.database.session import engine

# Import models so SQLAlchemy registers all table metadata before create_all.
from app import models  # noqa: F401


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
