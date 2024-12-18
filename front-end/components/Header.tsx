import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/header/header.module.css";
import postButtonStyles from "@/styles/buttons/AddPostButton.module.css";
import LanguageButton from "./LanguageButton";
import ProfileMenu from "./ProfileMenu";
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userFullName, setUserFullName] = useState<string>("Unknown User");
  const [userRole, setUserRole] = useState<string>("user");
  const router = useRouter();

  useEffect(() => {
    const userToken = sessionStorage.getItem("loggedInUser");

    if (userToken) {
      const userInfo = JSON.parse(userToken);
      console.log("User Token:", userInfo);

      setIsLoggedIn(true);
      setUserFullName(userInfo.fullName || "Unknown User");
      setUserRole(userInfo.role || "user");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search Query:", searchQuery);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Link href="/addpost">
          <button className={`${styles.sharedButton} ${postButtonStyles.makePostButton}`}>
            {t("header.makePostButton")}
          </button>
        </Link>
      </div>

      <div className={styles.searchBarContainer}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t("header.searchPlaceholder")}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            {t("header.searchButton")}
          </button>
        </form>
      </div>

      <div className={styles.userMenu}>
        {isLoggedIn ? (
          <>
            <ProfileMenu userRole={userRole} onLogout={handleLogout} />
            <LanguageButton />
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
