import React, { useEffect, useState } from "react";
import styles from "@/styles/profile/Profile.module.css";
import { Profile } from "@/types";
import UserService from "@/services/UserService";
import LayoutWrapper from "@/components/Layoutwrapper";
import ContentGrid from "@/components/ContentGrid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const loggedInUserString = sessionStorage.getItem("loggedInUser");
        if (!loggedInUserString) {
          throw new Error("Logged-in user data is missing in sessionStorage.");
        }

        const loggedInUser = JSON.parse(loggedInUserString);
        const username = loggedInUser.username;

        if (!username) {
          throw new Error("Username is missing from the logged-in user data.");
        }

        const profile = await UserService.getProfileByUsername(username);

        console.log("Fetched profile:", profile);

        setProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>{t('profilePage.loading')}</div>;
  }

  if (!profile) {
    return <div>{t('profilePage.profileError')}</div>;
  }

  return (
    <LayoutWrapper>
      <div className={styles.profileContainer}>
        <h1>{t('profilePage.profileOf')} {profile.username}</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.profilePic}>
              <img src="/img/profilepic.png" alt={t('profilePage.profilePicAlt')} />
            </div>
            <div className={styles.profileDetails}>
              <p><strong>{t('profilePage.username')}:</strong> {profile.username}</p>
              <p><strong>{t('profilePage.role')}:</strong> {profile.role}</p>
              <p><strong>{t('profilePage.bio')}:</strong> {profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.postsSection}>
        <h2>{t('profilePage.postsBy')} {profile.username}</h2>
        <ContentGrid username={profile.username} />
      </div>
    </LayoutWrapper>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default ProfilePage;
