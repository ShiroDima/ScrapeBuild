from pydantic import BaseModel, UUID4, ConfigDict
import pendulum as pdl


from backend.core.database.database import Base


from typing import Generic, TypeVar, Type, Self


T = TypeVar('T')

class StandardResponse(BaseModel, Generic[T]):
    success: bool
    data: T


class WorkflowResponse(BaseModel):
    id: UUID4
    userId: UUID4
    user: str
    name: str
    description: str
    created_at: pdl.DateTime

    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        extra="ignore"
    )

    def from_orm(self, value: Type[Base]) -> Self:
        return self(**value.__dict__)