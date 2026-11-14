import re

from app.repositories.memory_store import ConversationContext
from app.schemas.common import TaskIntent
from app.services.rag.interfaces import IntentResult

ALIASES: list[tuple[TaskIntent, str]] = [
    ("open_tfsa", r"\btfsa\b|tax[ -]free savings"),
    ("replace_debit", r"\bdebit\b|\b(bank|lost|replace|replacement|stolen) card\b"),
    ("open_chequing", r"\bche(?:ck|qu)ing\b|open (?:a |an |my )?(?:bank )?account"),
    ("withdraw_cash", r"\bwithdraw\b|\bcash\b"),
    ("check_balance", r"\bbalance\b"),
    ("online_access", r"\bpassword\b|\blog[ -]?in\b|\bsign[ -]?in\b|locked out|online (?:banking )?access"),
]


class RuleBasedIntentDetector:
    def detect(self, message: str, context: ConversationContext) -> IntentResult:
        text = message.lower().replace("’", "'")
        task = next((name for name, pattern in ALIASES if re.search(pattern, text)), None)
        if re.search(r"\b(where|when|what time)\b.*\b(appointment|booking)\b|\bmy booking\b", text):
            return IntentResult(context.booking.purpose if context.booking else None, "booking_details")
        wants_booking = bool(re.search(r"\b(book|schedule|arrange)\b|(?:want|need|like) (?:to )?(?:visit|go to) (?:a |the )?branch|(?:want|need|make) (?:a |an )?appointment", text))
        if re.search(r"\b(don't|do not|no|not)\b.*\b(book|appointment|visit)\b", text):
            wants_booking = False
        if re.search(r"\b(document|documents|bring|prepare|preparation|checklist|id)\b", text):
            return IntentResult(task or context.active_intent, "documents", wants_booking)
        if task:
            return IntentResult(task, wants_booking=wants_booking)
        if wants_booking:
            return IntentResult(context.active_intent or "general_appointment", wants_booking=True)
        if context.active_intent and re.search(r"^(what (?:are )?(?:the )?next|what do i need|how do i (?:do|start)|tell me more|yes|please|can i do (?:it|that) online)\b", text):
            return IntentResult(context.active_intent)
        return IntentResult(None, "unknown")
