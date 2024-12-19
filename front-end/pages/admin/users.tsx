import React, { useState, useEffect } from "react";
import styles from "@/styles/admin/Users.module.css";
import Layout from "@/components/Layoutwrapper";
import { UserData } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import useSWR, { mutate } from "swr";
import { ProfileService } from "@/services/ProfileService";
import { UserService } from "@/services/UserService";
import Head from "next/head";

const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isModerator, setIsModerator] = useState<boolean | null>(null);

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
        Authorization: `Bearer ${token}`,
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
    const checkAccess = () => {
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
      if (loggedInUser?.role === "Admin") {
        setIsAdmin(true);
        setIsModerator(false);
      } else if (loggedInUser?.role === "Moderator") {
        setIsAdmin(false);
        setIsModerator(true);
      } else {
        setIsAdmin(false);
        setIsModerator(false);
      }
    };

    checkAccess();
  }, []);

  const { data: users, error, isValidating } = useSWR<UserData[]>(
    isAdmin || isModerator ? `${process.env.NEXT_PUBLIC_API_URL}/users` : null,
    fetchUsers
  );

  const handleDelete = async (username: string, email: string) => {
    try {
      const confirmation = window.confirm(t("usersPage.confirmDelete"));
      if (confirmation) {
        await ProfileService.deleteProfileByUsername(username);
        await UserService.deleteUserByEmail(email);
        alert(t("usersPage.deleteSuccess"));
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      }
    } catch (error) {
      alert(t("usersPage.deleteError"));
      console.error(error);
    }
  };

  const handleRoleChange = async (email: string, newRole: string) => {
    try {
      const confirmation = window.confirm(
        t("usersPage.confirmRoleChange", { newRole })
      );
      if (confirmation) {
        alert(t("usersPage.roleChangeSuccess"));
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      }
    } catch (error) {
      alert(t("usersPage.roleChangeError"));
      console.error(error);
    }
  };

  if (isAdmin === null && isModerator === null) {
    return <div>{t("usersPage.loading")}</div>;
  }

  if (!isAdmin && !isModerator) {
    return <div>{t("usersPage.accessDenied")}</div>;
  }

  if (isValidating) {
    return <div>{t("usersPage.loadingUsers")}</div>;
  }

  if (error) {
    return <div>{t("usersPage.fetchError")}</div>;
  }

  return (
    <Layout>
      <Head>
        <title>Rate My Kot - {t("usersPage.adminPanel")}</title>
      </Head>
      <div className={styles.usersContainer}>
        <h1>{t("usersPage.manageUsers")}</h1>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>{t("usersPage.username")}</th>
              <th>{t("usersPage.fullName")}</th>
              <th>{t("usersPage.email")}</th>
              <th>{t("usersPage.role")}</th>
              <th>{t("usersPage.bio")}</th>
              {isAdmin && <th>{t("usersPage.actions")}</th>}
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.email}>
                <td>{user.profile?.username || t("usersPage.notAvailable")}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.profile?.role || t("usersPage.user")}</td>
                <td>{user.profile?.bio || t("usersPage.noBio")}</td>
                {isAdmin && user.profile?.role !== "Admin" && (
                  <td>
                    <div className={styles.dropdown}>
                      <button className={styles.dropdownButton}>
                        {t("usersPage.actions")}
                      </button>
                      <div className={styles.dropdownContent}>
                        {user.profile?.role !== "Moderator" && (
                          <button
                            onClick={() =>
                              handleDelete(
                                user.profile?.username || "",
                                user.email || ""
                              )
                            }
                          >
                            {t("usersPage.delete")}
                          </button>
                        )}
                        <button
                          onClick={() =>
                            handleRoleChange(
                              user.email || "",
                              user.profile?.role === "Moderator"
                                ? "User"
                                : "Moderator"
                            )
                          }
                        >
                          {t(
                            user.profile?.role === "Moderator"
                              ? "usersPage.makeUser"
                              : "usersPage.makeModerator"
                          )}
                        </button>
                      </div>
                    </div>
                  </td>
                )}
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
