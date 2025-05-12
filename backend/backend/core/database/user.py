from typing import Type, TypeVar


from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete


from backend.core.database.models import User


class UserDBRepoMixin:
    async def get_user_by_clerk_id(self, session: AsyncSession, clerkId: str) -> User:
        query = select(User).where(User.clerkId == clerkId)

        response = await session.execute(query)

        return response.scalar_one_or_none()
    
    async def get_user_by_id(self, session: AsyncSession, userId: str) -> User:
        query = select(User).where(User.id == userId)

        response = await session.executer(query)

        return response.scalar_or_none()
    

