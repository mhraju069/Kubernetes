from sqlalchemy import Column, Integer, String, Text
from database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    date = Column(String, index=True, nullable=False)  # YYYY-MM-DD
    start_time = Column(String, nullable=True)         # HH:MM
    end_time = Column(String, nullable=True)           # HH:MM
    category = Column(String, default="personal")      # work, personal, important, holiday
    location = Column(String, nullable=True)
