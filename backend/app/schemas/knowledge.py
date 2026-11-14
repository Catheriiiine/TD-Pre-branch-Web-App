from typing import Literal

from pydantic import Field

from app.schemas.common import Channel, Schema, TaskIntent


class SourceReference(Schema):
    policy_id: str
    title: str
    excerpt: str
    provenance: Literal["mock"] = "mock"


class KnowledgeRecord(Schema):
    id: str
    title: str
    intent: TaskIntent
    keywords: list[str] = Field(min_length=1)
    content: str
    recommended_channel: Channel
    alternative_channels: list[Channel] = []
    steps: list[str] = Field(min_length=1)
    preparation_checklist: list[str] = []
    appointment_purpose: TaskIntent | None = None
    provenance: Literal["mock"]
