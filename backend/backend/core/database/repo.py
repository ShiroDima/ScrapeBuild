from typing import Annotated, Self


from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from fastapi import Depends


from backend.core.database.user import UserDBRepoMixin
from backend.core.database.workflow import WorkflowDBRepoMixin


# ModelType = TypeVar('ModelType', bound=Base)


class DBRepo(UserDBRepoMixin, WorkflowDBRepoMixin):
    """
    DB CRUD Class
    """

    def __init__(self) -> None:
        ...

    def __call__(self) -> Self:
        return self()


DB_Dependency = Annotated[DBRepo, Depends(DBRepo)]