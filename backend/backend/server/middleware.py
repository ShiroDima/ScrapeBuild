from fastapi.responses import JSONResponse
from fastapi import status, Request, Response, Header
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
from starlette.requests import Request as StarletteRequest



from urllib.parse import urlparse
from typing import Callable, Annotated
import logging


from backend.core.utils import is_production_env
from backend.core.settings import app_settings


class LocalhostCORSMiddleware(CORSMiddleware):
    """
    Custom CORS middleware that allows any request from localhost/127.0.0.1 domain, while using the standard CORS rules for other origins
    """

    def __init__(self, app: ASGIApp, **kwargs) -> None:
        super().__init__(app, **kwargs)

    def is_allowed_origin(self, origin: str):

        if origin and not is_production_env():
            parsed = urlparse(origin)
            hostname = parsed.hostname or ""


            # Allow any localhost/127.0.0.1 origin regardless of port
            if hostname in ["localhost", "127.0.0.1"]:
                return True

        return super().is_allowed_origin(origin)
    

class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    Rate limiting middleware. The exact implementation of the rate limiting algorithm is injected for use.
    """
    def __init__(self, app: ASGIApp, rate_limiter):
        super().__init__(app)
        self.rate_limiter = rate_limiter


    async def dispatch(self, request: StarletteRequest, call_next: Callable):
        if not self.is_rate_limited_request(request):
            return await call_next(request)
        
        ok = await self.rate_limiter(request)

        if not ok:
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={"message": "Too many requests"},
                headers={"Retry-After": "5"}
            )
        
        return await call_next(request)
    
    def is_rate_limited(self, request: Request):
        if request.url.path in self.rate_limited_paths:
            return True
        

        return False
    

class LoggingMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp):
        super().__init__(app)
        self.logger = logging.getLogger(app_settings.ENVIRONMENT)


    async def dispatch(self, request: Request, call_next: Callable):
        path = request.url.path
        method = request.method
        try:
            self.logger.info(f"{method} for {path} recieved")
            response: Response = await call_next(request)
            status = response.status_code
            self.logger.info(f"{method} for {path} finished with status: {status}")
            return response
        except Exception as error:
            self.logger.error(f"An error occurred:\n[{method}] | [{path}]\n{error}")
            raise error
        

class AuthMiddleware(BaseHTTPMiddleware):
    excluded_urls = [
        "/docs",
        "/openapi.json",
        "/health"
    ]

    def __init__(self, app: ASGIApp):
        super().__init__(app)
    
    async def dispatch(self, request: Request, call_next: Callable):
        logger = logging.getLogger(app_settings.ENVIRONMENT)

        if request.url.path in self.excluded_urls:
            return await call_next(request)
        
        logger.info("Fetching USER ID from request header...")
        
        _user_id = request.headers.get("X-USER-ID")

        logger.info("User ID found in request header.")
        
        try:
            request.state.user_id = _user_id
        except Exception as error:
            logger.error(f"Error occurred:\n{error}")
            raise error

        logger.info("Calling next middleware in stack...")

        return await call_next(request)