import React from "react";
import Link from "next/link";
import styles from '@/styles/sidebar/sidebar.module.css';

const Sidebar: React.FC = () => {
    return (
        <nav className={styles.sidebar}>
            <div className={styles.logo}>
                <Link href="/">
                    <img src="/img/logo.png" alt="Rate My Kot Logo" className={styles.logoImage} />
                </Link>
            </div>
            <ul className={styles.navList}>
                <li>navlink1</li>
                <li>navlink2</li>
                <li>navlink3</li>
                <li>navlink4</li>
            </ul>
        </nav>
    );
};

export default Sidebar;
