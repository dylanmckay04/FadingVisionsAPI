from sqlalchemy import Column, Integer, ForeignKey, Table
from app.database import Base


gallery_photos = Table(
    "gallery_photos",
    Base.metadata,
    Column("gallery_id", Integer, ForeignKey("galleries.id"), primary_key=True),
    Column("photo_id", Integer, ForeignKey("photos.id"), primary_key=True)
)