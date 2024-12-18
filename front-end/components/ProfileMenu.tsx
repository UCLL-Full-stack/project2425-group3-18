import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/header/header.module.css";
import { useTranslation } from "next-i18next";

interface ProfileMenuProps {
  userRole: string;
  onLogout: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userRole, onLogout }) => {
  const { t } = useTranslation();
  const [showLogoutMenu, setShowLogoutMenu] = useState<boolean>(false);
  const logoutMenuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  const handleAdminClick = () => {
    router.push("/admin/users");
  };

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

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img
        src="/img/profilepic.png"
        alt={t('profileMenu.profilePicAlt')}
        className={styles.profilePic}
        onClick={toggleLogoutMenu}
      />
      {showLogoutMenu && (
        <div ref={logoutMenuRef} className={styles.logoutMenu}>
          <Link href="/profile">
            <button className={styles.logoutOption}>{t('profileMenu.profile')}</button>
          </Link>
          {userRole === "Admin" && (
            <button onClick={handleAdminClick} className={styles.logoutOption}>
              {t('profileMenu.manageUsers')}
            </button>
          )}
          <button onClick={onLogout} className={styles.logoutOption}>
            {t('profileMenu.logout')}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
