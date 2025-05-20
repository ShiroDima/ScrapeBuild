from fastapi import APIRouter, Request, Path


from typing import Annotated


from backend.core.database.repo import DB_Dependency
from backend.core.database.database import Session_Dependency
from backend.server.schema import StandardResponse


user = APIRouter(
    prefix="/api/user/{user_id}",
    tags=['User']
)

@user.get("/")
async def get_user_info(
    user_id: Annotated[str, Path(
        title='The clerk ID for the user'
    )], 
    request: Request, 
    db: DB_Dependency, 
    session: Session_Dependency
):
    return {}