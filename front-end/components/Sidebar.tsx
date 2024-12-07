import React from "react";

const Sidebar: React.FC = () => {
    return (
        <nav style={styles.sidebar}>
            <div style={styles.logo}>
                <img src="/img/logo.png" alt="Rate My Kot Logo" style={styles.logoImage} />
            </div>
            <ul style={styles.navList}>
                <li>navlink1</li>
                <li>navlink2</li>
                <li>navlink3</li>
                <li>navlink4</li>
            </ul>
        </nav>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    sidebar: {
        width: "150px",
        backgroundColor: "#fff",
        borderRight: "1px solid #ddd",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
    },
    logo: {
        marginBottom: "2rem",
        textAlign: "center",
    },
    logoImage: {
        maxWidth: "120px",
        height: "auto",
    },
    navList: {
        listStyle: "none",
        padding: 0,
        lineHeight: "2rem",
        fontSize: "1rem",
        fontWeight: "500",
        color: "#555",
    },
};

export default Sidebar;
