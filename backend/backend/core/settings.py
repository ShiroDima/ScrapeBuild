from pydantic_settings import BaseSettings

class BrowserSettings(BaseSettings):
    BROWSER_USE_LOG_LEVEL: str = "info"

class ApplicationSettings(BaseSettings):
    # Postgres configuration
    POSTGRES_USER: str = 'postgres'
    POSTGRES_PASSWORD: str = 'postgres'
    POSTGRES_HOST: str = 'localhost'
    POSTGRES_DB_NAME: str = "scrapeBuild"
    POSTGRES_PORT: int = 5432

    ENVIRONMENT: str = "dev"

    browser_settings: BrowserSettings = BrowserSettings()


app_settings = ApplicationSettings()
