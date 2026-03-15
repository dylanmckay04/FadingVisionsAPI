import httpx
from app.config import settings

UNSPLASH_BASE_URL = "https://api.unsplash.com"

async def search_photos(query: str, per_page: int = 12) -> list[dict]:
    headers = {"Authorization": f"Client-ID {settings.UNSPLASH_ACCESS_KEY}"}
    params = {"query": query, "per_page": per_page}
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{UNSPLASH_BASE_URL}/search/photos",
            headers=headers,
            params=params
        )
        response.raise_for_status()
        data = response.json()
    
    return [
        {
            "unsplash_id": photo["id"],
            "description": photo.get("description"),
            "alt_text": photo.get("alt_description"),
            "photographer": photo["user"]["name"],
            "photographer_url": photo["user"]["links"]["html"],
            "image_url_regular": photo["urls"]["regular"],
            "image_url_thumb": photo["urls"]["thumb"],
            "unsplash_url": photo["links"]["html"]
        }
        for photo in data["results"]
    ]
