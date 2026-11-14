from collections.abc import Callable
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from threading import RLock
from uuid import uuid4

from pydantic import BaseModel

from app.api.errors import DomainError
from app.schemas.appointments import Booking, BookingConfirmedEvent
from app.schemas.chat import ChatMessage, Session
from app.schemas.common import TaskIntent

Clock = Callable[[], datetime]


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


@dataclass
class ConversationContext:
    messages: list[ChatMessage] = field(default_factory=list)
    active_intent: TaskIntent | None = None
    booking: Booking | None = None


@dataclass
class SessionState:
    session: Session
    context: ConversationContext = field(default_factory=ConversationContext)
    events: list[BookingConfirmedEvent] = field(default_factory=list)
    requests: dict[str, tuple[dict, BaseModel]] = field(default_factory=dict)


class MemoryStore:
    """One-process store. Callers hold lock through each complete mutation."""

    def __init__(self, ttl_minutes: int, clock: Clock = utc_now):
        self.clock = clock
        self.ttl = timedelta(minutes=ttl_minutes)
        self.lock = RLock()
        self.sessions: dict[str, SessionState] = {}
        self.bookings: dict[str, Booking] = {}
        self.reserved_slots: set[str] = set()

    def create_session(self) -> Session:
        with self.lock:
            self.sessions = {key: value for key, value in self.sessions.items() if value.session.expires_at > self.clock()}
            session = Session(session_id=str(uuid4()), expires_at=self.clock() + self.ttl)
            self.sessions[session.session_id] = SessionState(session=session)
            return session

    def get_session(self, session_id: str) -> SessionState:
        state = self.sessions.get(session_id)
        if state is None or state.session.expires_at <= self.clock():
            self.sessions.pop(session_id, None)
            raise DomainError(404, "session_expired", "This conversation has expired. Start a new conversation to continue.")
        state.session.expires_at = self.clock() + self.ttl
        return state

    @staticmethod
    def replay(state: SessionState, key: str, payload: dict) -> BaseModel | None:
        cached = state.requests.get(key)
        if cached is None:
            return None
        original, result = cached
        if original != payload:
            raise DomainError(409, "request_conflict", "This request ID was already used with different details.")
        return result
