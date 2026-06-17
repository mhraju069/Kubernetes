# OrbitCal - FastAPI Calendar Application

OrbitCal is a small, premium, and fast calendar application built using **FastAPI** for the backend and a modern single-page-app (SPA) front-end. It features SQLite data persistence and integrates directly with a free public holiday API (with robust offline/fallback handling).

## Features

- **Interactive Calendar Grid**: Smooth month-to-month navigation (Next, Previous, Today).
- **Event Management**: Create, edit, and delete events.
- **Categorized Badging**: Personal, Work, Important, and Holiday tags with harmonious color palettes.
- **External Holiday Integration**: Live holiday lookups from [Nager.Date API](https://date.nager.at/) (no API key required) with automatic fallback if offline.
- **Search & Filter**: Find specific events instantly using the real-time search bar.
- **Upcoming Events List**: View a chronological list of upcoming events for the active month in the sidebar.
- **Dark Mode Aesthetic**: A premium dark interface styled with modern typography (`Outfit`), glassmorphic design details, and smooth hover micro-animations.
- **Dockerized Deployment**: Easily run and scale using Docker or Docker Compose.

---

## Tech Stack

- **Backend**: FastAPI (Python 3.9), SQLAlchemy, Pydantic v2, Uvicorn, HTTPX
- **Frontend**: HTML5, CSS3 (Vanilla), Vanilla JavaScript
- **Database**: SQLite3
- **Containerization**: Docker, Docker Compose

---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)

### Running with Docker Compose (Recommended)

1. Navigate to the project directory:
   ```bash
   cd projects/calcendarApp
   ```

2. Start the container in detached mode:
   ```bash
   docker-compose up -d --build
   ```

3. The application will build, initialize the SQLite database, and start. You can access the UI in your browser at:
   - **Main Webpage**: [http://localhost:8080](http://localhost:8080)
   - **Interactive API Docs**: [http://localhost:8080/docs](http://localhost:8080/docs)

4. To stop the application:
   ```bash
   docker-compose down
   ```

### Running Locally (Without Docker)

1. Make sure you have python 3.9+ installed.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI development server:
   ```bash
   python main.py
   ```
4. Access the application at [http://localhost:8000](http://localhost:8000).

---

## Folder Structure

```text
calcendarApp/
├── Dockerfile                # Configures Python container environment
├── docker-compose.yml        # Configures port mapping (8080:8000) and db volume
├── requirements.txt          # Python dependencies
├── main.py                   # FastAPI routing and holiday api proxy
├── database.py               # SQLite / SQLAlchemy configuration
├── models.py                 # SQLAlchemy Event table schema
├── schemas.py                # Pydantic v2 validation models
├── data/                     # Host-mounted folder for SQLite database (gitignored)
│   └── calendar.db           # SQLite DB file
└── static/                   # Front-end static assets
    ├── index.html            # Main UI layout
    ├── css/
    │   └── style.css         # Styling system & dark theme variables
    └── js/
        └── app.js            # Calendar rendering and event handlers
```
