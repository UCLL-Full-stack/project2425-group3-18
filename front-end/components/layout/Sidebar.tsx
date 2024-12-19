import React from "react";
import Link from "next/link";
import styles from '../../styles/sidebar/sidebar.module.css';
import styles2 from "../../styles/buttons/viewKotenButton.module.css";
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
                <li className={styles2.viewKotenButton}>
                    <Link href="/koten">
                        <button className={styles2.viewKotButton}>
                            {t('sidebar.viewKotenButton')}
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
