import React, { useEffect, useState } from "react";
import styles from "@/styles/profile/Profile.module.css";
import { User, UserData } from "@/types";
import UserService from "@/services/UserService";
import Layoutwrapper from "@/components/Layoutwrapper";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("Token is missing.");
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const loggedInEmail = decodedToken.email;

        const users: UserData[] = await UserService.getAllUsers();

        const loggedInUser = users.find((user) => user.email === loggedInEmail);

        if (loggedInUser) {
          setUser(loggedInUser);
        } else {
          console.error("User not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layoutwrapper>
      <div className={styles.profileContainer}>
        <h1>Profile of {user.firstName} {user.lastName}</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.profilePic}>
              <img src="/img/profilepic.png" alt="Profile" />
            </div>
            <div className={styles.profileDetails}>
              <p><strong>Username:</strong> {user.profile.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.profile.role}</p>
              <p><strong>Bio:</strong> {user.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </Layoutwrapper>
  );
};

export default ProfilePage;
