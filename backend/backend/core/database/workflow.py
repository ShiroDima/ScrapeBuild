from typing import Sequence
import logging


from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete


from backend.core.database.models import User, Workflow
from backend.server.schema import CreateWorkflowSchema


logger = logging.getLogger(__name__)


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
        query = select(Workflow).filter_by(userId = clerkId)

        response = await session.execute(query)

        return response.scalars().all()
    
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
            IntegrityError
        """
        try:
            workflow: Workflow = Workflow(**workflow_data.model_dump())
            workflow.userId = clerkId

            session.add(workflow)

            await session.commit()
        except IntegrityError as error:
            logger.exception(f"Integrity Error:\n{error}")
            raise

    
    # async def get_user_by_id(self, session: AsyncSession, userId: str) -> Workflow | None:
    #     query = select(User).where(User.id == userId)

    #     response = await session.executer(query)

    #     return response.scalar_or_none()