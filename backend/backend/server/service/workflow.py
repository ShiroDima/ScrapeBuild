from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import status, HTTPException

from typing import Sequence


from backend.core.database.repo import DBRepo
from backend.core.database.models import Workflow


async def fetch_user_workflows_with_clerkId(db: DBRepo, session: AsyncSession, clerkId: str) -> Sequence[Workflow]:
    try:
        _user_workflows = await db.get_user_workflows(session, clerkId)

        if _user_workflows is None:
            return []

        return _user_workflows
    except Exception as error:
        raise HTTPException(
            detail=f"An unexpected error occurred.\n{error}", #TODO Change this to a better reflection of the error that occurred
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )