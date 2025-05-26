from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import status
from sqlalchemy.exc import IntegrityError
from pydantic import UUID4

from typing import Sequence
import logging


from backend.core.database.repo import DBRepo
from backend.core.database.models import Workflow
from backend.server.exceptions import *
from backend.server.schema import CreateWorkflowSchema
from backend.core.settings import app_settings

logger = logging.getLogger(app_settings.ENVIRONMENT)

async def fetch_user_workflows_with_clerkId(db: DBRepo, session: AsyncSession, clerkId: str) -> Sequence[Workflow]:
    try:
        _user_workflows = await db.get_user_workflows(session, clerkId)

        if _user_workflows is None:
            return []

        return _user_workflows
    except Exception as error:
        logger.exception(f'Error occurred:\n{error}')
        raise WorkflowFetchException(error)
    

async def create_user_workflows(workflow_create_schema: CreateWorkflowSchema, db: DBRepo, session: AsyncSession, clerkId: str) -> Workflow:
    """
    Create a new user workflow from the data given.

    Args:
        workflow_create_schema (CreateWorkflowSchema): The data for the workflow to create 
    """
    try:
        return await db.create_user_workflow(workflow_create_schema, session, clerkId)
    except IntegrityError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="One or more unique fields already exists in the database."
        )
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while creating the user workflow."
        )
    

async def delete_user_workflow(workflow_id: UUID4, db: DBRepo, session: AsyncSession, clerkId: str) -> None:
    """
    Delete a user workflow from the database.

    Args:
        workflow_id (str): The id of the specific workflow to be deleted
        clerkId (str): User ID 
    Returns:
        None
    Raises:
        HTTPException (404, 500): If workflow not found or an error occurs while trying to delete the database
    """

    try:
        await db.delete_user_workflow(workflow_id, session, clerkId)
    except Exception as Error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while deleting the workflow."
        )


