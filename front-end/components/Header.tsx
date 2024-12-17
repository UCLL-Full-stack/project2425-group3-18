import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/header/header.module.css";
import postButtonStyles from "@/styles/buttons/AddPostButton.module.css";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState<boolean>(false);
  const [userFullName, setUserFullName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const logoutMenuRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (logoutMenuRef.current && !logoutMenuRef.current.contains(event.target as Node)) {
        setShowLogoutMenu(false);
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
    sessionStorage.removeItem("loggedInUser"); // Correct key for logout
    sessionStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    setShowLogoutMenu(false);
    router.push("/login");
  };

  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  const handleAdminClick = () => {
    router.push("/admin/users");
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
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
        {isLoggedIn ? (
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <img
              src="/img/profilepic.png"
              alt="Profile"
              className={styles.profilePic}
              onClick={toggleLogoutMenu}
            />
            {showLogoutMenu && (
              <div ref={logoutMenuRef} className={styles.logoutMenu}>
                <Link href="/profile">
                  <button className={styles.logoutOption}>Profile</button>
                </Link>
                {userRole === "Admin" && (
                  <button onClick={handleAdminClick} className={styles.logoutOption}>
                    Manage Users
                  </button>
                )}
                <button onClick={handleLogout} className={styles.logoutOption}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
