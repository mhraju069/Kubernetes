from pydantic import BaseModel, ConfigDict
from typing import Optional

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: str  # YYYY-MM-DD
    start_time: Optional[str] = None  # HH:MM
    end_time: Optional[str] = None  # HH:MM
    category: Optional[str] = "personal"
    location: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None

class Event(EventBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
