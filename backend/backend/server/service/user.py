from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import status, HTTPException


from backend.core.database.repo import DBRepo
from backend.core.database.models import User
from backend.server.exceptions import UserNotFoundInDB, DBQueryException


async def fetch_user_with_clerkId(db: DBRepo, session: AsyncSession, clerkId: str) -> User:
    try:
        _user = await db.get_user_by_clerk_id(session, clerkId)

        if _user is None:
            raise UserNotFoundInDB()
        
        return _user
    
    except HTTPException as error:
        raise error
    
    except Exception as error:
        raise DBQueryException(error)