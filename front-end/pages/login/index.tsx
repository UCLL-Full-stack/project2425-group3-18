import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/login/Login.module.css";
import { User, UserData2 } from "@/types";
import { ErrorOutline } from '@mui/icons-material';
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { UserService } from "@/services/UserService";

const LoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const users: UserData2[] = [
    {
      id: 7,
      firstName: "Thomas",
      lastName: "Van den houdt",
      email: "thomas.vandenhoudt@gmail.com",
      password: "thomas123",
      profile: {
        id: 7,
        username: "Buuuldog",
        bio: "just a user",
        role: "User",
      },
    },
    {
      id: 8,
      firstName: "Daan",
      lastName: "Hoeven",
      email: "daan.hoeven@gmail.com",
      password: "daan123",
      profile: {
        id: 8,
        username: "DaanGamemeneer",
        bio: "just a user",
        role: "User",
      },
    },
    {
      id: 9,
      firstName: "Harry",
      lastName: "Potter",
      email: "koten.master@gmail.com",
      password: "harry123",
      profile: {
        id: 9,
        username: "Kotenmaster",
        bio: "The admin of this site",
        role: "Admin",
      },
    },
    {
      id: 10,
      firstName: "Percy",
      lastName: "Jackson",
      email: "koten.moderator@gmail.com",
      password: "percy123",
      profile: {
        id: 10,
        username: "Kotenmoderator",
        bio: "A moderator of this site",
        role: "Moderator",
      },
    },
  ];  

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/");
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

      const userData = await UserService.loginUser(user);

      sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
      sessionStorage.setItem("isLoggedIn", "true");

      router.push("/");
    } catch (error) {
      setIsSubmitting(false);

      if (error instanceof Error) {
        setErrorMessage(error.message || t("login.errorUnexpected"));
      } else {
        setErrorMessage(t("login.errorUnexpected"));
      }
    }
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/img/logo2.png" />
        <title>Rate My Kot - {t("login.login")}</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("login.login")}</h1>

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
            <label>{t("login.email")}</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={handleInputChange(setEmail)}
              placeholder={t("login.enterEmail")}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>{t("login.password")}</label>
            <div className={styles.passwordWrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                className={styles.input}
                value={password}
                onChange={handleInputChange(setPassword)}
                placeholder={t("login.enterPassword")}
                required
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                <img
                  src={"/img/eye-password-hide.svg"}
                  alt={t("login.togglePasswordVisibility")}
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
            {isSubmitting ? t("login.loggingIn") : t("login.loginButton")}
          </button>
        </form>

        <div className={styles.signupLink}>
          <p>
            {t("login.dontHaveAccount")}
            <Link href="/register">{t("login.signUpHere")}</Link>
          </p>
        </div>

        <div className={styles.userTableContainer}>
          <h2 id="UserListTitle">{t("login.userList")}</h2>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>{t("login.emailColumn")}</th>
                <th>{t("login.roleColumn")}</th>
                <th>{t("login.passwordColumn")}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>{user.profile ? user.profile.role : "No role available"}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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

export default LoginPage;
