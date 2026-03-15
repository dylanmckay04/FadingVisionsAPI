import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav style={styles.nav}>
            <Link to="/galleries" style={styles.brand}>Fading Visions</Link>
            {token && (
                <button onClick={handleLogout} style={styles.button}>
                    Logout
                </button>
            )}
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#1a1a1a",
        borderBottom: "1px solid #222",
        height: "60px",
    },
    brand: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "#f0f0f0",
        textDecoration: "none",
    },
    button: {
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        border: "none",
        background: "#333",
        color: "#f0f0f0",
        cursor: "pointer",
    },
};

export default Navbar;