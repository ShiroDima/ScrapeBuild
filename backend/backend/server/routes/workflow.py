from fastapi import APIRouter, status, Request
from fastapi.responses import JSONResponse


from typing import Sequence


from backend.core.database.repo import DB_Dependency
from backend.core.database.database import Session_Dependency
from backend.server.schema import StandardResponse
from backend.core.database.models import Workflow
from backend.server.service.workflow import fetch_user_workflows_with_clerkId




workflow = APIRouter(
    prefix="/api/workflow/{user_id}",
    tags=['Workflow'],
    
)


@workflow.get("/")
async def get_user_workflows(user_id: str, request: Request, db: DB_Dependency, session: Session_Dependency):
    user_workflows = await fetch_user_workflows_with_clerkId(db, session, user_id)

    return StandardResponse(
        success=True,
        data=user_workflows
    )