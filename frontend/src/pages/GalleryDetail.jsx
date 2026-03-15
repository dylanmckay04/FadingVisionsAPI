import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../api/client";

function GalleryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gallery, setGallery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchGallery();
    }, [id]);

    async function fetchGallery() {
        try {
            const response = await client.get(`/galleries/${id}`);
            setGallery(response.data);
        } catch (err) {
            setError("Failed to load gallery");
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch(e) {
        e.preventDefault();
        setSearching(true);
        setError("");
        try {
            await client.post(`/galleries/${id}/photos/search`, {
                query,
                per_page: 12,
            });
            await fetchGallery();
            setQuery("");
        } catch (err) {
            setError("Search failed");
        } finally {
            setSearching(false);
        }
    }

    async function handleRemovePhoto(photoId) {
        try {
            await client.delete(`/galleries/${id}/photos/${photoId}`);
            setGallery({
                ...gallery,
                photos: gallery.photos.filter(p => p.id !== photoId),
            });
        } catch (err) {
            setError("Failed to remove photo");
        }
    }

    if (loading) return <div style={styles.centered}>Loading...</div>;
    if (!gallery) return <div style={styles.centered}>Gallery not found</div>;

    return (
        <div style={styles.container}>
            <button onClick={() => navigate("/galleries")} style={styles.back}>← Back to Galleries</button>

            <h1 style={styles.heading}>{gallery.name}</h1>
            <p style={styles.aesthetic}>{gallery.aesthetic}</p>

            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={handleSearch} style={styles.form}>
                <input style={styles.input} placeholder="Search for photos to add..." values={query} onChange={(e) => setQuery(e.target.value)} required></input>
                <button style={styles.button} type="submit" disabled={searching}>
                    {searching ? "Searching..." : "Search & Add"}
                </button>
            </form>
            
            {gallery.photos.length === 0 ? (
                <p style={styles.empty}>No photos yet. Search above to add some.</p>
            ) : (
                <div style={styles.grid}>
                    {gallery.photos.map((photo) => (
                        <div key={photo.id} style={styles.photoCard}>
                            <img
                                src={photo.image_url_regular}
                                alt={photo.alt_text || photo.description || "photo"}
                                style={styles.images}
                            ></img>
                            <div style={styles.photoInfo}>
                                <a href={photo.photographer_url} target="_blank" rel="noreferrer" style={styles.photographer}>{photo.photographer}</a>
                                <button style={styles.removeButton} onClick={() => handleRemovePhoto(photo.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
    },
    back: {
        background: "none",
        border: "none",
        color: "#888",
        cursor: "pointer",
        fontSize: "0.95rem",
        marginBottom: "1.5rem",
        padding: 0,
    },
    heading: {
        fontSize: "2rem",
        marginBottom: "0.4rem",
    },
    aesthetic: {
        color: "#6366f1",
        marginBottom: "2rem",
        fontSize: "1rem",
    },
    form: {
        display: "flex",
        gap: "1rem",
        marginBottom: "2.5rem",
        flexWrap: "wrap",
    },
    input: {
        padding: "0.75rem 1rem",
        borderRadius: "8px",
        border: "1px solid #333",
        background: "#1a1a1a",
        color: "#f0f0f0",
        fontSize: "1rem",
        flex: 1,
        minWidth: "200px",
    },
    button: {
        padding: "0.75rem 1.5rem",
        borderRadius: "8px",
        border: "none",
        background: "#6366f1",
        color: "white",
        fontSize: "1rem",
        cursor: "pointer",
        whiteSpace: "nowrap",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1.5rem",
    },
    photoCard: {
        borderRadius: "12px",
        overflow: "hidden",
        backgroun: "#1a1a1a",
    },
    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        display: "block",
    },
    photoInfo: {
        padding: "0.75rem 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    photographer: {
        color: "#888",
        fontSize: "0.85rem",
        textDecoration: "none",
    },
    removeButton: {
        background: "none",
        border: "none",
        color: "#ef4444",
        cursor: "pointer",
        fontSize: "0.85rem",
    },
    empty: {
        color: "#888",
        textAlign: "center",
        marginTop: "4rem",
    },
    error: {
        color: "#ef4444",
        marginBottom: "1rem",
    },
    centered: {
        textAlign: "center",
        marginTop: "4rem",
        color: "#888",
    },
};

export default GalleryDetail;