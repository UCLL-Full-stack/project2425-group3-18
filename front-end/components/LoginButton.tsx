import Link from "next/link";
import styles from "@/styles/buttons/LoginButton.module.css";

export default function LoginButton() {
  return (
    <Link href="/login">
      <button className={`${styles.sharedButton} ${styles.loginButton}`}>
        Log In
      </button>
    </Link>
  );
}
