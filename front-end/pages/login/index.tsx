import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import UserService from "@/services/UserService";
import styles from "@/styles/login/Login.module.css";
import { User, UserData } from "@/types";
import { ErrorOutline } from '@mui/icons-material';
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [users, setUsers] = useState<UserData[]>([]); // Store users in state
  const router = useRouter();

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await UserService.getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();

    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/"); // Redirect to home page if logged in
    }
  }, [router]);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const user: Partial<User> = { email, password };
      const response = await UserService.loginUser(user as User);

      if (response?.token) {
        sessionStorage.setItem(
          "authToken",
          JSON.stringify({
            token: response.token,
            fullname: `${response.firstName} ${response.lastName}`,
            email,
          })
        );
        sessionStorage.setItem("isLoggedIn", "true");

        router.push("/"); // Redirect after successful login
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error: unknown) {
      setIsSubmitting(false);

      if (error instanceof Error) {
        if (error.message.includes("invalid")) {
          setErrorMessage("The given password is invalid. Please try again.");
        } else if (error.message.includes("does not exist")) {
          setErrorMessage("User does not exist. Please check your email.");
        } else {
          setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
        }
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>

      {errorMessage && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: "red",
          }}
        >
          <ErrorOutline fontSize="small" />
          {errorMessage}
        </span>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={handleInputChange(setEmail)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={passwordVisible ? "text" : "password"}
              className={styles.input}
              value={password}
              onChange={handleInputChange(setPassword)}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              <img
                src={passwordVisible ? "/img/eye-password-show.svg" : "/img/eye-password-hide.svg"}
                alt="Toggle Password Visibility"
                className={styles.eyeIcon}
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className={styles.signupLink}>
        <p>
          Don't have an account? <Link href="/register">Sign Up here</Link>
        </p>
      </div>
      <div className={styles.userTableContainer}>
      <h2 id="UserListTitle">User List</h2>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.profile ? user.profile.role : "No role available"}</td>
                <td>Password</td>
              </tr>
            ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoginPage;