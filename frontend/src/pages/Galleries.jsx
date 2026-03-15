import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

function Galleries() {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [aesthetic, setAesthetic] = useState("");
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchGalleries();
    }, []);

    async function fetchGalleries() {
        try {
            const response = await client.get("/galleries");
            setGalleries(response.data);
        } catch (err) {
            setError("Failed to load galleries");
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(e) {
        e.preventDefault();
        setCreating(true);
        try {
            const response = await client.post("/galleries", { name, aesthetic});
            setGalleries([...galleries, response.data]);
            setName("");
            setAesthetic("");
        } catch (err) {
            setError("Failed to create gallery");
        } finally {
            setCreating(false);
        }
    }

    async function handleDelete(id) {
        try {
            await client.delete(`/galleries/${id}`);
            setGalleries(galleries.filter((g) => g.id !== id));
        } catch (err) {
            setError("Failed to delete gallery");
        }
    }

    if (loading) return <div style={styles.centered}>Loading...</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Your Galleries</h1>

            {error && <p style={styles.heading}>{error}</p>}

            <form onSubmit={handleCreate} style={styles.form}>
                <input
                    style={styles.input}
                    placeholder="Gallery name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                >
                </input>
                <input
                    style={styles.input}
                    placeholder="Aesthetic (e.g. dark academia)"
                    value={aesthetic}
                    onChange={(e) => setAesthetic(e.target.value)}
                    required
                >
                </input>
                <button style={styles.button} type="submit" disabled={creating}>
                    {creating ? "Creating..." : "Create Gallery"}
                </button>
            </form>

            {galleries.length < 0 ? (
                <p>No galleries yet. Create one above.</p>
            ) : (
                <div style={styles.grid}>
                    {galleries.map((gallery) => (
                        <div key={gallery.id} style={styles.card}>
                            <div style={styles.cardContent} onClick={() => navigate(`/galleries/${gallery.id}`)}>
                                <h2 style={styles.cardTitle}>{gallery.name}</h2>
                                <p style={styles.cardAesthetic}>{gallery.aesthetic}</p>
                                <p style={styles.cardCount}>
                                    {gallery.photos.length} photo{gallery.photos.length !== 1 ? "s" : ""}
                                </p>
                            </div>
                            <button style={styles.deleteButton} onClick={() => handleDelete(gallery.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "2rem",
    },
    heading: {
        fontSize: "2rem",
        marginBottom: "2rem",
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
        background: "1a1a1a",
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
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1.5rem",
    },
    card: {
        background: "#1a1a1a",
        borderRadius: "12px",
        overflox: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    cardContent: {
        padding: "1.5rem",
        cursor: "pointer",
    },
    cardTitle: {
        fontSize: "1.2rem",
        marginBottom: "0.4rem",
    },
    cardAesthetic: {
        color: "#6366f1",
        fontSize: "0.9rem",
        marginBottom: "0.75rem",
    },
    cardCount: {
        color: "#888",
        fontSize: "0.85rem",
    },
    deleteButton: {
        padding:"0.75rem",
        border: "none",
        borderTop: "1px solid #222",
        background: "transparent",
        color: "#ef4444",
        cursor: "pointer",
        fontSize: "0.9rem",
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

export default Galleries;