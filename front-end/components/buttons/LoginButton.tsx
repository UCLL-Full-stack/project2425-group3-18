import Link from "next/link";
import styles from "@/styles/buttons/LoginButton.module.css";
import { useTranslation } from "next-i18next";

export default function LoginButton() {
  const { t } = useTranslation();
  return (
    <Link href="/login">
      <button className={`${styles.sharedButton} ${styles.loginButton}`}>
        Log In
      </button>
    </Link>
  );
}
