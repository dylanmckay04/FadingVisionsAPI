from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from app.database import Base, engine
from app.models import user
from app.routers import auth, galleries
import time
import sqlalchemy

def wait_for_db(retries=10, delay=3):
    for attempt in range(retries):
        try:
            with engine.connect():
                print("Database is ready")
                return
        except sqlalchemy.exc.OperationalError:
            print(f"Database not ready, retrying in {delay}s... (attempt {attempt + 1}/{retries})")
            time.sleep(delay)
    raise Exception("Could not connect to database after multiple retries")

wait_for_db()
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Fading Visions API")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred"}
    )

app.include_router(auth.router)
app.include_router(galleries.router)

@app.get("/health")
def health():
    return {"status": "ok"}

