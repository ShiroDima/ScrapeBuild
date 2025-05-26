from contextlib import asynccontextmanager
import sys
import logging

from fastapi import FastAPI
from fastapi.responses import JSONResponse

from backend.core.database.database import create_db_and_tables
from backend.core.logging import setup_logging
from backend import __version__
from backend.server.routes import workflow
from backend.core.settings import app_settings


logger = logging.getLogger(app_settings.ENVIRONMENT)


@asynccontextmanager
async def _lifespan(app: FastAPI):
    try:
        setup_logging()
        await create_db_and_tables()
        logger.info("Application started successfully")
        yield
    except Exception as error:
        # If an error occurred, log the error to the console and shutdown the app
        logger.error(f"Error occurred:\n{error}")
        sys.exit(1)


app = FastAPI(
    title="ScrapeBuild",
    description="""
## ScrapeBuild
The simple way to build scrapers using GUI!

This is the API for creating workflows and scheduling jobs to run on the server.
                """,
    version=__version__,
    lifespan=_lifespan
)

@app.get("/health")
async def health_handler() -> JSONResponse:
    return {
        "status": "OK",
        "message": "API is running properly"
    }

app.include_router(workflow)