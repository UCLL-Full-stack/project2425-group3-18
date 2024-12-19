import Link from "next/link";
import styles from "@/styles/buttons/SignupButton.module.css";
import { useTranslation } from "next-i18next";

export default function SignupButton() {
  const { t } = useTranslation();
  return (
    <Link href="/register">
      <button className={`${styles.sharedButton} ${styles.signupButton}`}>
        Sign Up
      </button>
    </Link>
  );
}
