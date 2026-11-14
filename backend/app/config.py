from pathlib import Path
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=Path(__file__).parents[1] / ".env", extra="ignore")

    app_env: str = "development"
    cors_origins: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    intent_provider: Literal["rules"] = "rules"
    retrieval_provider: Literal["local"] = "local"
    generation_provider: Literal["mock"] = "mock"
    session_ttl_minutes: int = Field(default=60, ge=1, le=1440)
    data_directory: Path = Path(__file__).parent / "data"
