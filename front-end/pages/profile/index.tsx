import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import useSWR from "swr";
import Head from "next/head";
import styles from "@/styles/profile/Profile.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ProfileService } from "@/services/ProfileService";
import Layout from "@/components/layout/Layoutwrapper";
import ContentGrid from "@/components/contentGrid/ContentGrid";
import { kotService } from "@/services/KotService";

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

    const profile = await ProfileService.getProfileByUsername(username);
    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState<string | undefined>();
  const [koten, setKoten] = useState<any[]>([]);
  const [showKoten, setShowKoten] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch logged-in user's profile and set username
  useEffect(() => {
    const loggedInUserString = sessionStorage.getItem("loggedInUser");
    if (loggedInUserString) {
      const loggedInUser = JSON.parse(loggedInUserString);
      setUsername(loggedInUser.username);
    }
  }, []);

  const { data: profile, error: profileError, isLoading } = useSWR("userProfile", fetchProfile);

  // Handle fetching koten
  const handleShowKoten = async () => {
    if (!username) return;

    try {
      const fetchedKoten = await kotService.getKotenByUsername(username);
      setKoten(fetchedKoten);
      setShowKoten(!showKoten); // Toggle visibility
    } catch (error) {
      setError("Failed to fetch koten");
    }
  };

  if (isLoading) {
    return <div>{t('profilePage.loading')}</div>;
  }

  if (profileError || !profile) {
    return <div>{t('profilePage.profileError')}</div>;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/img/logo2.png" />
        <title>Rate My Kot - {profile.username}</title>
      </Head>

      <Layout>
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

              {/* Button to toggle koten visibility */}
              <div className={styles.kotenButtonSection}>
                <button 
                  className={styles.kotenButton} 
                  onClick={handleShowKoten}
                >
                  {showKoten ? t("profilePage.hideKotenButton") : t("profilePage.showKotenButton")}
                </button>

                {error && <p className={styles.error}>{error}</p>}

                {showKoten && koten.length > 0 && (
                  <div className={styles.kotenList}>
                    <h3>{t('profilePage.kotenListTitle')}</h3>
                    <ul>
                      {koten.map((kot) => (
                        <li key={kot.id}>
                          <p>{kot.location.city}, {kot.location.street} {kot.location.housenumber}</p>
                          <p>Price: €{kot.price}</p>
                          <p>Surface Space: {kot.surfaceSpace} m²</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {showKoten && koten.length === 0 && <p>{t('profilePage.noKoten')}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.postsSection}>
          <h2>{t('profilePage.postsBy')} {profile.username}</h2>
          <ContentGrid searchQuery={""} username={profile.username} />
        </div>
      </Layout>
    </>
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
