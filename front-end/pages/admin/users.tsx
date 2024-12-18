import React, { useState, useEffect } from "react";
import styles from "@/styles/admin/Users.module.css";
import Layout from "@/components/Layoutwrapper";
import { UserData } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const getAllUsers = async (): Promise<UserData[]> => {
    try {
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
      const token = loggedInUser.token;
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching users:", errorData);
        throw new Error(errorData.message || "Failed to fetch users");
      }

      const users = await response.json();
      return users;
    } catch (error) {
      console.error("Error in getAllUsers function:", error);
      throw error;
    }
  };

  useEffect(() => {
    const checkAdminAccess = () => {
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
      console.log("Logged In User:", loggedInUser);
      if (loggedInUser?.role === "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminAccess();
  }, []);

  useEffect(() => {
    if (isAdmin === null) return;
    if (isAdmin) {
      const fetchUsers = async () => {
        try {
          const userData = await getAllUsers();
          setUsers(userData);
        } catch (error) {
          setError("Failed to fetch users.");
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [isAdmin]);

  if (isAdmin === null) {
    return <div>{t('usersPage.loading')}</div>;
  }

  if (!isAdmin) {
    return <div>{t('usersPage.accessDenied')}</div>;
  }

  if (loading) {
    return <div>{t('usersPage.loadingUsers')}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <div className={styles.usersContainer}>
        <h1>{t('usersPage.manageUsers')}</h1>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>{t('usersPage.username')}</th>
              <th>{t('usersPage.fullName')}</th>
              <th>{t('usersPage.email')}</th>
              <th>{t('usersPage.role')}</th>
              <th>{t('usersPage.bio')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.profile?.username || t('usersPage.notAvailable')}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.profile?.role || t('usersPage.user')}</td>
                <td>{user.profile?.bio || t('usersPage.noBio')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
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

export default UsersPage;
