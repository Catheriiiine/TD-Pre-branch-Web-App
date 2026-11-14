from dataclasses import dataclass
from typing import Literal, Protocol

from app.repositories.memory_store import ConversationContext
from app.schemas.chat import AssistantDraft
from app.schemas.common import TaskIntent
from app.schemas.knowledge import KnowledgeRecord


@dataclass(frozen=True)
class IntentResult:
    intent: TaskIntent | None
    question_kind: Literal["task", "documents", "booking_details", "unknown"] = "task"
    wants_booking: bool = False


class IntentDetector(Protocol):
    def detect(self, message: str, context: ConversationContext) -> IntentResult: ...


class Retriever(Protocol):
    def retrieve(self, query: str, intent: IntentResult, context: ConversationContext) -> list[KnowledgeRecord]: ...


class Generator(Protocol):
    def generate(self, message: str, context: ConversationContext, intent: IntentResult, policies: list[KnowledgeRecord]) -> AssistantDraft: ...
