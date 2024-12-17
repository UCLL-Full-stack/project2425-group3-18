import React, { useState, useEffect } from "react";
import styles from "@/styles/admin/Users.module.css"; // Adjust the CSS path as necessary
import Layout from "@/components/Layoutwrapper";
import { UserData } from "@/types";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // Track admin state

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
      console.log("Logged In User:", loggedInUser); // Log the entire loggedInUser object
      // Check if profile and role exist
      if (loggedInUser?.role === "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminAccess();
  }, []);

  useEffect(() => {
    if (isAdmin === null) return; // Wait until isAdmin is set
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
  }, [isAdmin]); // Fetch only if isAdmin is confirmed

  if (isAdmin === null) {
    return <div>Loading...</div>; // Wait for admin check
  }

  if (!isAdmin) {
    return <div>Access Denied</div>; // Display message if not an admin
  }

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
    <div className={styles.usersContainer}>
      <h1>Manage Users</h1>
      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Bio</th>
          </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <tr key={user.email}>
                <td>{user.profile?.username || "N/A"}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.profile?.role || "User"}</td>
                <td>{user.profile?.bio || "No bio available"}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default UsersPage;
