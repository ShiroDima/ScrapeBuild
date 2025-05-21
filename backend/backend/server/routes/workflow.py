from fastapi import APIRouter, status, Request
from fastapi.responses import JSONResponse


from typing import Sequence


from backend.core.database.repo import DB_Dependency
from backend.core.database.database import Session_Dependency
from backend.server.schema import (
    StandardResponse,
    CreateWorkflowSchema
)
from backend.core.database.models import Workflow
from backend.server.schema import WorkflowResponse, ErrorModel
from backend.server.service.workflow import (
    fetch_user_workflows_with_clerkId,
    create_user_workflows
)
from backend.server.exceptions import *




workflow = APIRouter(
    prefix="/api/workflow/{user_id}",
    tags=['Workflow']
)


@workflow.get(
    "/",
    responses={
        status.HTTP_200_OK: {"model": StandardResponse[Sequence[WorkflowResponse]], "description": "Successfully retrieved the workflows for the user."},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ErrorModel, "description": "An error occurred while fetching the user's workflows."}
    },
    status_code=status.HTTP_200_OK
)
async def get_user_workflows(user_id: str, db: DB_Dependency, session: Session_Dependency):
    user_workflows = await fetch_user_workflows_with_clerkId(db, session, user_id)

    return StandardResponse(
        success=True,
        data=[WorkflowResponse.from_orm(w) for w in user_workflows]
    )

@workflow.post(
    "/create",
    responses={
        status.HTTP_201_CREATED: {"model": StandardResponse[str], "description": "Workflow created successfully."},
        status.HTTP_400_BAD_REQUEST: {"model": ErrorModel, "description": "Trying to add to the database, one or more fields that should be unique in the database."},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": None, "description": "An error occurred while creating the workflow"}
    },
    status_code=status.HTTP_201_CREATED
)
async def create_new_user_workflow(
    clerkId: str,
    create_workflow_data: CreateWorkflowSchema,
    db: DB_Dependency,
    session: Session_Dependency
):
    await create_user_workflows(create_workflow_data, db, session, clerkId)

    return StandardResponse(
        success=True,
        data="Workflow created successfully"
    )