from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import Field

from app.schemas.common import Channel, Schema, TaskIntent
from app.schemas.knowledge import SourceReference


class Session(Schema):
    session_id: str
    expires_at: datetime


class ChatRequest(Schema):
    session_id: UUID
    request_id: UUID
    message: str = Field(min_length=1, max_length=2000)


class ChatMessage(Schema):
    id: str
    role: Literal["user", "assistant"]
    content: str
    created_at: datetime


class Guidance(Schema):
    intent: TaskIntent
    recommended_channel: Channel
    reason: str
    steps: list[str]
    checklist: list[str]
    sources: list[SourceReference]


class OpenBookingAction(Schema):
    type: Literal["open_booking"] = "open_booking"
    purpose: TaskIntent
    policy_ids: list[str]


class AssistantDraft(Schema):
    content: str
    guidance: Guidance | None = None
    actions: list[OpenBookingAction] = []


class ChatTurn(Schema):
    session_id: str
    request_id: str
    messages: list[ChatMessage]
    guidance: Guidance | None = None
    actions: list[OpenBookingAction] = []
