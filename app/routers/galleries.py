from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.gallery import Gallery
from app.models.photo import Photo
from app.models.user import User
from app.schemas.gallery import GalleryCreate, GalleryOut
from app.schemas.photo import PhotoSearch, PhotoOut
from app.routers.auth import get_current_user
from app.services.unsplash import search_photos
from typing import List


router = APIRouter(prefix="/galleries", tags=["galleries"])

@router.post("", response_model=GalleryOut, status_code=status.HTTP_201_CREATED)
async def create_gallery(gallery_data: GalleryCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    gallery = Gallery(
        name=gallery_data.name,
        aesthetic=gallery_data.aesthetic,
        owner_id=current_user.id
    )
    db.add(gallery)
    db.commit()
    db.refresh(gallery)
    return gallery

@router.get("", response_model=List[GalleryOut])
async def get_galleries(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Gallery).filter(Gallery.owner_id == current_user.id).all()

@router.get("/{gallery_id}", response_model=GalleryOut)
async def get_gallery(gallery_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    gallery = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not gallery:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery not found")
    if gallery.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authenticated")
    return gallery

@router.delete("/{gallery_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_gallery(gallery_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    gallery = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not gallery:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery not found")
    if gallery.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authenticated")
    db.delete(gallery)
    db.commit()

@router.post("/{gallery_id}/photos/search", response_model=List[PhotoOut])
async def search_and_add_photos(gallery_id: int, search_data: PhotoSearch, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    gallery = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not gallery:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery not found")
    if gallery.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authenticated")
    
    results = await search_photos(search_data.query, search_data.per_page)
    
    added_photos = []
    for photo_data in results:
        photo = db.query(Photo).filter(Photo.unsplash_id == photo_data["unsplash_id"]).first()
        if not photo:
            photo = Photo(**photo_data)
            db.add(photo)
            db.commit()
            db.refresh(photo)
        if photo not in gallery.photos:
            gallery.photos.append(photo)
        added_photos.append(photo)
    
    db.commit()
    return added_photos

@router.delete("/{gallery_id}/photos/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_photo_from_gallery(gallery_id: int, photo_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    gallery = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not gallery:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery not found")
    if gallery.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    photo = db.query(Photo).filter(Photo.id == photo_id).first()
    if not photo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Photo not found")
    gallery.photos.remove(photo)
    db.commit()