import React, { useState, useEffect } from "react";
import styles from "@/styles/admin/Users.module.css";
import Layout from "@/components/Layoutwrapper";
import { UserData } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import useSWR from "swr";

const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const fetchUsers = async (url: string): Promise<UserData[]> => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    const token = loggedInUser.token;
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(url, {
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
  };

  useEffect(() => {
    const checkAdminAccess = () => {
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
      if (loggedInUser?.role === "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminAccess();
  }, []);

  const { data: users, error, isValidating } = useSWR<UserData[]>(
    isAdmin ? `${process.env.NEXT_PUBLIC_API_URL}/users` : null,
    fetchUsers
  );

  if (isAdmin === null) {
    return <div>{t('usersPage.loading')}</div>;
  }

  if (!isAdmin) {
    return <div>{t('usersPage.accessDenied')}</div>;
  }

  if (isValidating) {
    return <div>{t('usersPage.loadingUsers')}</div>;
  }

  if (error) {
    return <div>{t('usersPage.fetchError')}</div>;
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
            {users?.map((user) => (
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
      ...(await serverSideTranslations(locale ?? "en", ["common", "usersPage"])),
    },
  };
};

export default UsersPage;
