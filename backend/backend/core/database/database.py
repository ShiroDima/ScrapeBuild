from backend.core.settings import app_settings
from backend.core.database.models import Base

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from fastapi import Depends

from typing import AsyncGenerator, Annotated


POSTGRES_DB_URL = f"postgresql+asyncpg://{app_settings.POSTGRES_USER}:{app_settings.POSTGRES_PASSWORD}@{app_settings.POSTGRES_HOST}:{app_settings.POSTGRES_PORT}/{app_settings.POSTGRES_DB_NAME}"

engine = create_async_engine(
    POSTGRES_DB_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)

_async_session_maker = async_sessionmaker(
    engine,
    expire_on_commit=False,
    autoflush=False
)

async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Yields an async session.
    To be used mainly with dependency injection system of FastAPI
    """

    async with _async_session_maker() as session:
        try:
            yield session
        except Exception as e:
            await session.rollback()
            raise e
        finally:
            await session.close()


Session_Dependency = Annotated[AsyncSession, Depends(get_async_session)]