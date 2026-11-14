from datetime import date, datetime
from typing import Literal
from uuid import UUID

from pydantic import Field

from app.schemas.chat import ChatTurn
from app.schemas.common import Schema, TaskIntent


class Branch(Schema):
    id: str
    name: str
    display_address: str
    timezone: str
    supported_purposes: list[TaskIntent]
    is_mock: Literal[True] = True


class AvailabilityRules(Schema):
    weekdays: list[int]
    start_hour: int = Field(ge=0, le=23)
    end_hour: int = Field(ge=1, le=24)
    slot_minutes: int = Field(ge=1, le=120)
    horizon_days: int = Field(ge=1, le=90)


class AppointmentSlot(Schema):
    id: str
    branch_id: str
    starts_at: datetime
    ends_at: datetime


class Availability(Schema):
    branch_id: str
    date: date
    timezone: str
    slots: list[AppointmentSlot]


class BookingRequest(Schema):
    session_id: UUID
    request_id: UUID
    branch_id: str = Field(min_length=1, max_length=100)
    slot_id: str = Field(min_length=1, max_length=200)
    purpose: TaskIntent


class Booking(Schema):
    id: str
    branch_id: str
    purpose: TaskIntent
    starts_at: datetime
    ends_at: datetime
    timezone: str
    status: Literal["simulated_confirmed"] = "simulated_confirmed"


class BookingConfirmedEvent(Schema):
    id: str
    type: Literal["appointment.confirmed"] = "appointment.confirmed"
    session_id: str
    booking_id: str
    purpose: TaskIntent
    occurred_at: datetime
    is_mock: Literal[True] = True


class BookingResponse(Schema):
    booking: Booking
    event: BookingConfirmedEvent
    chat_turn: ChatTurn
