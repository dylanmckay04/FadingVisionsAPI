from pydantic import BaseModel, field_validator
from datetime import datetime

class PhotoOut(BaseModel):
    id: int
    unsplash_id: str
    description: str | None
    alt_text: str | None
    photographer: str
    photographer_url: str
    image_url_regular: str
    image_url_thumb: str
    unsplash_url: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class PhotoSearch(BaseModel):
    query: str
    per_page: int = 12
    
    @field_validator("query")
    @classmethod
    def query_must_be_valid(cls, v):
        if not v.strip():
            raise ValueError("Query cannot be empty")
        return v.strip()
    
    @field_validator("per_page")
    @classmethod
    def per_page_must_be_valid(cls, v):
        if v < 1 or v > 30:
            raise ValueError("Photos per_page must be between 1 and 30")
        return v