import React, { useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Search Query:", searchQuery);
    };

    return (
        <header style={styles.header}>
            <div style={styles.searchBarContainer}>
                <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        style={styles.searchInput}
                    />
                    <button type="submit" style={styles.searchButton}>
                        Search
                    </button>
                </form>
            </div>
            <div style={styles.userMenu}>
                <ul style={styles.navList}>
                    <li>Profile</li>
                    <li>Settings</li>
                </ul>
                <div style={styles.buttons}>
                    <Link href="/register">
                        <button style={{ ...styles.sharedButton, ...styles.signupButton }}>
                            Sign Up
                        </button>
                    </Link>

                    <Link href="/login">
                        <button style={{ ...styles.sharedButton, ...styles.loginButton }}>
                            Log In
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottom: "1px solid #ddd",
        padding: "0.5rem 1rem",
        marginBottom: "1rem",
    },
    searchBarContainer: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-start",
    },
    searchForm: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "600px",
    },
    searchInput: {
        flex: 1,
        padding: "0.5rem",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ddd",
        marginRight: "1rem",
    },
    searchButton: {
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    userMenu: {
        display: "flex",
        alignItems: "center",
    },
    navList: {
        display: "flex",
        listStyle: "none",
        padding: 0,
        margin: 0,
        gap: "1rem",
        fontSize: "1rem",
        fontWeight: "500",
        color: "#555",
    },
    buttons: {
        display: "flex",
        gap: "0.5rem",
        marginLeft: "1rem",
    },
    sharedButton: {
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        fontSize: "0.9rem",
        cursor: "pointer",
        border: "none",
    },
    signupButton: {
        backgroundColor: "black",
        color: "#fff",
    },
    loginButton: {
        backgroundColor: "transparent",
        color: "#555",
        border: "1px solid #ddd",
    },
};

export default Header;
