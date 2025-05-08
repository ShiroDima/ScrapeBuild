from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import String
import uuid
import pendulum as pdl
from functools import partial

class Base(DeclarativeBase):
    pass


###  All models will be defined in this file

class Workflow(Base):
    id: Mapped[uuid.UUID] = mapped_column(
        uuid.UUID, primary_key=True, default=uuid.uuid4
    )
    userId: Mapped[str] = mapped_column(
        String(length=256), unique=True, index=True, nullable=False
    )
    name: Mapped[str] = mapped_column(
        String(length=256), nullable=False, unique=True
    )
    description: Mapped[str] = mapped_column(
        String(length=256), nullable=True, unique=False
    )

    created_at: Mapped[pdl.DateTime] = mapped_column(
        pdl.DateTime, nullable=False, default=partial(pdl.now, tz=pdl.UTC)
    )
    updated_at: Mapped[pdl.DateTime] = mapped_column(
        pdl.DateTime, nullable=False, default=partial(pdl.now, tz=pdl.UTC)
    )