import re

from app.repositories.memory_store import ConversationContext
from app.schemas.knowledge import KnowledgeRecord
from app.services.rag.interfaces import IntentResult


class LocalRetriever:
    def __init__(self, records: list[KnowledgeRecord]):
        self.records = records

    def retrieve(self, query: str, intent: IntentResult, context: ConversationContext) -> list[KnowledgeRecord]:
        if intent.intent is None:
            return []
        words = set(re.findall(r"\w+", query.lower()))
        candidates = [record for record in self.records if record.intent == intent.intent]
        return sorted(candidates, key=lambda record: -len(words.intersection(record.keywords)))[:3]
