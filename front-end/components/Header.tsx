import React, { useState } from "react";
import Link from "next/link";
import styles from '@/styles/header/header.module.css';

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
        <header className={styles.header}>
            <div className={styles.searchBarContainer}>
                <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        Search
                    </button>
                </form>
            </div>
            <div className={styles.userMenu}>
                <ul className={styles.navList}>
                    <li>Profile</li>
                    <li>Settings</li>
                </ul>
                <div className={styles.buttons}>
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
                </div>
            </div>
        </header>
    );
};

export default Header;
