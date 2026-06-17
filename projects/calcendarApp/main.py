import httpx
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import os

import models
import schemas
from database import engine, get_db

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="FastAPI Calendar Application")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
@app.get("/api/events", response_model=List[schemas.Event])
def get_events(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Event)
    if start_date:
        query = query.filter(models.Event.date >= start_date)
    if end_date:
        query = query.filter(models.Event.date <= end_date)
    return query.all()

@app.get("/api/events/{event_id}", response_model=schemas.Event)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@app.post("/api/events", response_model=schemas.Event, status_code=status.HTTP_201_CREATED)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    db_event = models.Event(**event.model_dump())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@app.put("/api/events/{event_id}", response_model=schemas.Event)
def update_event(event_id: int, event_update: schemas.EventUpdate, db: Session = Depends(get_db)):
    db_event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    update_data = event_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_event, key, value)
        
    db.commit()
    db.refresh(db_event)
    return db_event

@app.delete("/api/events/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(event_id: int, db: Session = Depends(get_db)):
    db_event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(db_event)
    db.commit()
    return None

# Holiday API Proxy with offline/fallback capability
@app.get("/api/holidays")
async def get_holidays(year: int, country: str = "US"):
    url = f"https://date.nager.at/api/v3/PublicHolidays/{year}/{country}"
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(url)
            if response.status_code == 200:
                return response.json()
            else:
                return get_fallback_holidays(year, country)
    except Exception:
        # Fallback if internet is down or API is unresponsive
        return get_fallback_holidays(year, country)

def get_fallback_holidays(year: int, country: str):
    # Standard fallback holidays for US/BD/General
    # For US:
    if country.upper() == "US":
        return [
            {"date": f"{year}-01-01", "name": "New Year's Day", "localName": "New Year's Day"},
            {"date": f"{year}-07-04", "name": "Independence Day", "localName": "Independence Day"},
            {"date": f"{year}-11-26", "name": "Thanksgiving Day", "localName": "Thanksgiving Day"},
            {"date": f"{year}-12-25", "name": "Christmas Day", "localName": "Christmas Day"},
        ]
    elif country.upper() == "BD":
        return [
            {"date": f"{year}-02-21", "name": "Language Martyrs' Day", "localName": "Shaheed Day"},
            {"date": f"{year}-03-26", "name": "Independence Day", "localName": "Shadhinota Dibosh"},
            {"date": f"{year}-12-16", "name": "Victory Day", "localName": "Bijoy Dibosh"},
        ]
    else:
        return [
            {"date": f"{year}-01-01", "name": "New Year's Day", "localName": "New Year's Day"},
            {"date": f"{year}-12-25", "name": "Christmas Day", "localName": "Christmas Day"},
        ]

# Mount static folder
os.makedirs("static", exist_ok=True)
app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
