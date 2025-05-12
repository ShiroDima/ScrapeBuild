from backend.core.settings import app_settings

def is_production_env() -> bool:
    return app_settings.ENVIRONMENT.startswith("prod")