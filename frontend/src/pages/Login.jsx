import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import client from "../api/client";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const form = new FormData();
            form.append("username", email);
            form.append("password", password);

            const response = await client.post("/auth/login", form);
            localStorage.setItem("token", response.data.access_token);
            navigate("/galleries");
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Welcome Back</h1>
                <p style={styles.subtitle}>Sign in to see your galleries</p>

                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    >
                    </input>
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    >
                    </input>
                    <button style={styles.button} type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p style={styles.link}>
                    Don't have an account?{" "}
                    <Link to="/register" style={styles.anchor}>Register</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 60px)",
    },
    card: {
        background: "#1a1a1a",
        padding: "2.5rem",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "400px",
    },
    title: {
        fontSize: "1.8rem",
        marginBottom: "0.5rem",
    },
    subtitle: {
        color: "#888",
        marginBottom: "2rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    input: {
        padding: "0.75rem 1rem",
        borderRadius: "8px",
        border: "1px solid #333",
        background: "#111",
        color: "#f0f0f0",
        fontSize: "1rem",
    },
    button: {
        padding: "0.75rem",
        borderRadius: "8px",
        border: "none",
        background: "#6366f1",
        color: "white",
        fontSize: "1rem",
        cursor: "pointer",
        marginTop: "0.5rem",
    },
    error: {
        color: "#ef4444",
        marginBottom: "1rem",
        fontSize: "0.9rem",
    },
    link: {
        marginTop: "1.5rem",
        textAlign: "center",
        color: "#888",
        fontSize: "0.9rem",
    },
    anchor: {
        color: "#6366f1",
        textDecoration: "none",
    },
};

export default Login;