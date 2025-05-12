from typing import Sequence


from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete


from backend.core.database.models import User, Workflow


class WorkflowDBRepoMixin:
    async def get_user_workflows(self, session: AsyncSession, clerkId: str) -> Sequence[Workflow] | None:
        query = select(Workflow).filter_by(userId = clerkId)

        response = await session.execute(query)

        return response.scalars().all()
    
    # async def get_user_by_id(self, session: AsyncSession, userId: str) -> Workflow | None:
    #     query = select(User).where(User.id == userId)

    #     response = await session.executer(query)

    #     return response.scalar_or_none()