from fastapi import status, HTTPException


class UserNotFoundInDB(HTTPException):
    def __init__(self) -> None:
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")


class DBQueryException(HTTPException):
    def __init__(self, err: str) -> None:
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching resource"
        )

class WorkflowFetchException(HTTPException):
    def __init__(self, err: str) -> None:
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching workflows"
        )