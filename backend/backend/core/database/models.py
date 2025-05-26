from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import String, UUID, Date, ForeignKey
import pendulum as pdl
from pydantic import BaseModel


import uuid
from functools import partial
from typing import List


class Base(DeclarativeBase):
    pass


###  All models will be defined in this file

# class User(Base):
#     __tablename__ = "user"
    
#     id: Mapped[uuid.UUID] = mapped_column(
#         UUID, default=uuid.uuid4
#     )

#     clerkId: Mapped[str] = mapped_column(
#         String(length=256), unique=True, index=True, primary_key=True, nullable=False
#     )

#     email: Mapped[str] = mapped_column(
#         String(length=20), unique=True
#     )


    # workflows: Mapped[List['Workflow']] = relationship(back_populates='user', lazy="selectin", cascade="delete-orphan, delete, save-update, merge")



class Workflow(Base):
    __tablename__ = "workflow"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID, primary_key=True, default=uuid.uuid4
    )
    userId: Mapped[str] = mapped_column(String(length=50), nullable=False, unique=False)
    # user: Mapped[User] = relationship(back_populates='workflows', lazy='selectin', single_parent=True)
    name: Mapped[str] = mapped_column(
        String(length=256), nullable=False, unique=True
    )
    description: Mapped[str] = mapped_column(
        String(length=256), nullable=True, unique=False
    )

    created_at: Mapped[pdl.DateTime] = mapped_column(
        Date, nullable=False, default=partial(pdl.now, tz=pdl.UTC)
    )
    updated_at: Mapped[pdl.DateTime] = mapped_column(
        Date, nullable=False, default=partial(pdl.now, tz=pdl.UTC)
    )

    