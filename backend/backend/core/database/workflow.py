from typing import Sequence
import logging


from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete


from backend.core.database.models import Workflow
from backend.server.schema import CreateWorkflowSchema
from backend.core.settings import app_settings


logger = logging.getLogger(app_settings.ENVIRONMENT)


class WorkflowDBRepoMixin:
    async def get_user_workflows(self, session: AsyncSession, clerkId: str) -> Sequence[Workflow] | None:
        """
        DB method to fetch user workflows.

        Args:
            session (AsyncSession): Database session object
            clerkId (str): User ID whose workflow is needed

        Returns:
            workflows (Sequence[Workflows]): The workflows for ther user with id -> userId
        """
        
        try:
            query = select(Workflow).where(Workflow.userId == clerkId)

            response = await session.execute(query)

            return response.scalars().all()
        except Exception as error:
            logger.exception(f"Error occurred:\n{error}")
            raise error
    
    async def create_user_workflow(self, workflow_data: CreateWorkflowSchema, session: AsyncSession, clerkId: str) -> Workflow:
        """
        DB method to create a new user workflow.

        Args:
            workflow_data (CreateWorkflowSchema): The data to be inserted into the database
            session (AsyncSession): Database session object
            clerkId (str): User ID to link the workflow to a particular user
        
        Returns:
            None

        Raises:
            IntegrityError: If the creation of the workflow will violate any exsiting DB constraints
        """
        try:
            workflow: Workflow = Workflow(**workflow_data.model_dump())
            workflow.userId = clerkId

            session.add(workflow)

            await session.commit()
            return workflow
        except IntegrityError as error:
            logger.exception(f"Integrity Error:\n{error}")
            raise
        except Exception as error:
            logger.exception(f"Error occurred while creating workflow -> {error}")
            raise

    async def delete_user_workflow(self, workflow_id: str, session: AsyncSession, clerkId: str) -> None:
        """
        DB method to delete a user method.

        Args:
            workflow_id (str): The id of the specific workflow to be deleted
            session (AsyncSession): Database session object
            clerkId (str): User ID to link the workflow to a particular user
        
        Returns:
            None

        Raises:
            Exception: If an error occurs while deleting the workflow.
        """

        try:
            _query = delete(Workflow).where(Workflow.id == workflow_id)

            await session.execute(_query)

            await session.commit()
        except Exception as error:
            logger.exception(f"Error: \n{error}")
            raise error

        
    
    # async def get_user_by_id(self, session: AsyncSession, userId: str) -> Workflow | None:
    #     query = select(User).where(User.id == userId)

    #     response = await session.executer(query)

    #     return response.scalar_or_none()