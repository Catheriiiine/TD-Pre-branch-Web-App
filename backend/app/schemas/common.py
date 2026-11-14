from typing import Literal

from pydantic import BaseModel, ConfigDict

Channel = Literal["online", "atm", "phone", "branch"]
TaskIntent = Literal["open_chequing", "replace_debit", "open_tfsa", "withdraw_cash", "check_balance", "online_access", "general_appointment"]


class Schema(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


class ErrorDetail(Schema):
    code: str
    message: str
    field_errors: dict[str, str] | None = None


class ApiError(Schema):
    error: ErrorDetail
