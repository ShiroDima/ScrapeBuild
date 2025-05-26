from pydantic import BaseModel, UUID4, ConfigDict, Field, BeforeValidator
import pendulum as pdl


from backend.core.database.database import Base


from typing import Generic, TypeVar, Type, Self, Any, Annotated
import uuid
from datetime import datetime


T = TypeVar('T')


def convert_to_pendulum_datetime(v: Any) -> pdl.DateTime:
    if isinstance(v, pdl.DateTime):
        return v
    if isinstance(v, str):
        return pdl.parse(v)
    
    raise ValueError(f"Cannot convert {type(v)} to pendulum.DateTime")

PendulumDateTime = Annotated[
    pdl.DateTime,
    BeforeValidator(convert_to_pendulum_datetime),
    Field(
        json_schema_extra={
            "type": "string",
            "format": "date-time",
            "example": pdl.now().isoformat()
        }
    )
]


class StandardResponse(BaseModel, Generic[T]):
    success: bool
    data: T

class ErrorModel(BaseModel):
    status_code: int
    details: str

class CreateWorkflowSchema(BaseModel):
    # userId: UUID4
    name: str
    description: str
    # created_at: pdl.DateTime = Field(default_factory=pdl.now)
    # updated_at: pdl.DateTime = Field(default_factory=pdl.now)

class WorkflowResponse(BaseModel):
    id: UUID4
    userId: str
    # user: str
    name: str
    description: str
    # created_at: pdl.DateTime =  Field(json_schema_extra={"format": "date-time", "type": "string"})
    created_at: datetime

    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        extra="ignore",
        json_schema_extra={
            "examples": [
                {
                    "id": uuid.uuid4(),
                    "userId": uuid.uuid4(),
                    "user": "John Doe",
                    "name": "John's First Workflow",
                    "description": "Just another user",
                    "created_at": pdl.now().isoformat()
                }
            ]
        }
    )

    @staticmethod
    def from_orm(value: Type[Base]) -> 'WorkflowResponse':
        return WorkflowResponse(**value.__dict__)