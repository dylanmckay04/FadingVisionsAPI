from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import List

class GalleryCreate(BaseModel):
    name: str
    aesthetic: str
    
    @field_validator("name")
    @classmethod
    def name_must_be_valid(cls, v):
        if not v.strip():
            raise ValueError("Name cannot be empty")
        if len(v) > 100:
            raise ValueError("Name cannot exceed 100 characters")
        return v.strip()
    
    @field_validator("aesthetic")
    @classmethod
    def aesthetic_must_be_valid(cls, v):
        if not v.strip():
            raise ValueError("Aesthetic cannot be empty")
        if len(v) > 100:
            raise ValueError("Aesthetic cannot exceed 100 characters")
        return v.strip()


class GalleryOut(BaseModel):
    id: int
    name: str
    aesthetic: str
    created_at: datetime
    owner_id: int
    photos: List["PhotoOut"] = []
    
    class Config:
        from_attributes = True

from app.schemas.photo import PhotoOut
GalleryOut.model_rebuild()