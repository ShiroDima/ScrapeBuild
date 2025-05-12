from backend.server.app import app as base_app
from backend.server.middleware import LocalhostCORSMiddleware, LoggingMiddleware

from uvicorn import run

base_app.add_middleware(
    LocalhostCORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

base_app.add_middleware(LoggingMiddleware)




if __name__=="__main__":
    run("backend.server.listen:base_app", host="0.0.0.0", port=8000, reload=True)