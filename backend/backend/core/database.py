from backend.core.settings import app_settings
from backend.core.models import Base

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine


POSTGRES_DB_URL = f"postgres+asyncpg://{app_settings.POSTGRES_USER}:{app_settings.POSTGRES_PASSWORD}@{app_settings.POSTGRES_HOST}/{app_settings.POSTGRES_DB_NAME}"

engine = create_async_engine(
    POSTGRES_DB_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)

_async_session_maker = async_sessionmaker(
    engine,
    expire_on_commit=False,
    autoFlush=False
)

async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)