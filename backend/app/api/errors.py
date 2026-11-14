from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException

from app.schemas.common import ApiError, ErrorDetail


class DomainError(Exception):
    def __init__(self, status: int, code: str, message: str):
        self.status = status
        self.code = code
        self.message = message


def install_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(DomainError)
    async def domain_error(_request: Request, exc: DomainError) -> JSONResponse:
        return JSONResponse(status_code=exc.status, content=ApiError(error=ErrorDetail(code=exc.code, message=exc.message)).model_dump())

    @app.exception_handler(RequestValidationError)
    async def invalid_request(_request: Request, exc: RequestValidationError) -> JSONResponse:
        fields = {".".join(str(part) for part in error["loc"][1:]): error["msg"] for error in exc.errors()}
        return JSONResponse(status_code=422, content=ApiError(error=ErrorDetail(code="validation_error", message="Check the highlighted fields and try again.", field_errors=fields)).model_dump())

    @app.exception_handler(HTTPException)
    async def http_error(_request: Request, exc: HTTPException) -> JSONResponse:
        return JSONResponse(status_code=exc.status_code, content=ApiError(error=ErrorDetail(code="http_error", message=str(exc.detail))).model_dump())

    @app.exception_handler(Exception)
    async def unexpected_error(_request: Request, _exc: Exception) -> JSONResponse:
        return JSONResponse(status_code=500, content=ApiError(error=ErrorDetail(code="internal_error", message="The demo could not complete this request. Please try again.")).model_dump())
