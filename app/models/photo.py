from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
from app.models.associations import gallery_photos

class Photo(Base):
    __tablename__ = "photos"
    
    id = Column(Integer, primary_key=True, index=True)
    unsplash_id = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=True)
    alt_text = Column(String, nullable=True)
    photographer = Column(String, nullable=False)
    photographer_url = Column(String, nullable=False)
    image_url_regular = Column(String, nullable=False)
    image_url_thumb = Column(String, nullable=False)
    unsplash_url = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    galleries = relationship("Gallery", secondary=gallery_photos, back_populates="photos")