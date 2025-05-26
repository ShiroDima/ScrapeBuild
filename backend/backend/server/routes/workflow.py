from fastapi import APIRouter, status, Request, Path
from fastapi.responses import JSONResponse
from pydantic import UUID4


from typing import Sequence, Annotated


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
    create_user_workflows,
    delete_user_workflow
)
from backend.server.exceptions import *


workflow = APIRouter(
    prefix="/api/workflow",
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
async def get_user_workflows(req: Request, db: DB_Dependency, session: Session_Dependency):
    user_workflows = await fetch_user_workflows_with_clerkId(db, session, req.state.user_id)

    return StandardResponse(
        success=True,
        data=[WorkflowResponse.from_orm(w) for w in user_workflows] if len(user_workflows) != 0 else []
    )

@workflow.post(
    "/create",
    responses={
        status.HTTP_201_CREATED: {"model": StandardResponse[WorkflowResponse], "description": "Workflow created successfully."},
        status.HTTP_400_BAD_REQUEST: {"model": ErrorModel, "description": "Trying to add to the database, one or more fields that should be unique in the database."},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": None, "description": "An error occurred while creating the workflow"}
    },
    status_code=status.HTTP_201_CREATED
)
async def create_new_user_workflow(
    create_workflow_data: CreateWorkflowSchema,
    db: DB_Dependency,
    session: Session_Dependency,
    req: Request
):
    workflow = await create_user_workflows(create_workflow_data, db, session, req.state.user_id)

    return StandardResponse(
        success=True,
        data=WorkflowResponse.from_orm(workflow)
    )


@workflow.delete(
    "/{workflow_id}/delete",
    status_code=status.HTTP_200_OK,
    responses={
        status.HTTP_200_OK: {"model": None, "description": "Workflow successfully deleted."},
        status.HTTP_404_NOT_FOUND: {"model": ErrorModel, "description": "Workflow could not be found for the user."},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ErrorModel, "description": "An error occurred while deleting the workflow."}
    }
)
async def delete_old_user_workflow(workflow_id: Annotated[UUID4, Path()], db: DB_Dependency, session: Session_Dependency):
    await delete_user_workflow(workflow_id=workflow_id, session=session, db=db)

    return None