import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/buttons/LanguageButton.module.css";
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';

const LanguageButton: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState<boolean>(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu);
  };

  const handleLanguageChange = (lang: string) => {
    console.log(`Language changed to: ${lang}`);
    i18n.changeLanguage(lang);

    router.push(router.asPath, router.asPath, { locale: lang });

    setShowLanguageMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button className={styles.languageButton} onClick={toggleLanguageMenu}>
        <img src="/img/language.png" alt={t('header.languageButtonAlt')} className={styles.languageIcon} />
      </button>
      {showLanguageMenu && (
        <div ref={languageMenuRef} className={styles.languageMenu}>
          <div className={styles.languageMenuContent}>
            <button className={styles.languageOption} onClick={() => handleLanguageChange("en")}>
              {t('header.english')}
            </button>
            <button className={styles.languageOption} onClick={() => handleLanguageChange("nl")}>
              {t('header.dutch')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
