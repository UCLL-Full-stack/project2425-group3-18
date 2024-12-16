import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from '@/styles/header/header.module.css';
import postButtonStyles from '@/styles/buttons/AddPostButton.module.css';

const Header: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login state
    const [showLogoutMenu, setShowLogoutMenu] = useState<boolean>(false); // Toggle logout menu visibility
    const logoutMenuRef = useRef<HTMLDivElement | null>(null); // Reference to the logout menu

    // Simulate checking if the user is logged in (replace with actual auth logic)
    useEffect(() => {
        const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(userLoggedIn);
    }, []);

    // Close the logout menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (logoutMenuRef.current && !logoutMenuRef.current.contains(event.target as Node)) {
                setShowLogoutMenu(false); // Close the menu if click is outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Search Query:", searchQuery);
    };

    const handleLogout = () => {
        // Simulate logout (remove login state)
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
        setShowLogoutMenu(false); // Hide logout menu after logging out
    };

    const toggleLogoutMenu = () => {
        setShowLogoutMenu(!showLogoutMenu); // Toggle visibility of logout menu
    };

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                {/* Make a Post Button */}
                <Link href="/addpost">
                    <button className={`${styles.sharedButton} ${postButtonStyles.makePostButton}`}>
                        Make a Post
                    </button>
                </Link>
            </div>

            <div className={styles.searchBarContainer}>
                <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search a post..."
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        Search
                    </button>
                </form>
            </div>

            <div className={styles.userMenu}>
                <ul className={styles.navList}>
                    {isLoggedIn && (
                        <>
                            {/* Show profile and settings for logged-in users */}
                            <li>Profile</li>
                            <li>Settings</li>
                        </>
                    )}
                </ul>
                <div className={styles.buttons}>
                    {isLoggedIn ? (
                        <div style={{ position: "relative" }}>
                            <img
                                src="/img/profilepic.png"
                                alt="Profile"
                                style={{ width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer" }}
                                onClick={toggleLogoutMenu}
                            />
                            {showLogoutMenu && (
                                <div
                                    ref={logoutMenuRef}
                                    style={{
                                        position: "absolute", top: "60px", right: "0", backgroundColor: "#fff", border: "1px solid #ccc",
                                        padding: "10px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                                    }}
                                >
                                    <p onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>Logout</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Show Login and Sign Up buttons if not logged in
                        <>
                            <Link href="/register">
                                <button className={`${styles.sharedButton} ${styles.signupButton}`}>
                                    Sign Up
                                </button>
                            </Link>

                            <Link href="/login">
                                <button className={`${styles.sharedButton} ${styles.loginButton}`}>
                                    Log In
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
