import React, { useEffect, useState } from "react";
import styles from "@/styles/profile/Profile.module.css";
import { Profile } from "@/types";
import UserService from "@/services/UserService";
import LayoutWrapper from "@/components/Layoutwrapper";
import ContentGrid from "@/components/ContentGrid";

const ProfilePage: React.FC = () => {
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

        // Fetch the profile by username
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
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Error: Profile data is missing.</div>;
  }

  return (
    <LayoutWrapper>
      <div className={styles.profileContainer}>
        <h1>Profile of {profile.username}</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.profilePic}>
              <img src="/img/profilepic.png" alt="Profile" />
            </div>
            <div className={styles.profileDetails}>
              <p><strong>Username:</strong> {profile.username}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <p><strong>Bio:</strong> {profile.bio}</p>
            </div>
          </div>
        </div>

        {/* Add ContentGrid here to show posts by the user */}
      </div>
      <div className={styles.postsSection}>
          <h2>Posts by {profile.username}</h2>
          <ContentGrid username={profile.username} />
        </div>
    </LayoutWrapper>
  );
};

export default ProfilePage;
