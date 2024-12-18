import React from "react";
import Link from "next/link";
import styles from '@/styles/sidebar/sidebar.module.css';
import { useTranslation } from "next-i18next";

const Sidebar: React.FC = () => {
    const { t } = useTranslation();

    return (
        <nav className={styles.sidebar}>
            <div className={styles.logo}>
                <Link href="/">
                    <img src="/img/logo.png" alt={t('sidebar.logoAlt')} className={styles.logoImage} />
                </Link>
            </div>
            <ul className={styles.navList}>
                <li>{t('sidebar.navlink1')}</li>
                <li>{t('sidebar.navlink2')}</li>
                <li>{t('sidebar.navlink3')}</li>
                <li>{t('sidebar.navlink4')}</li>
            </ul>
        </nav>
    );
};

export default Sidebar;
