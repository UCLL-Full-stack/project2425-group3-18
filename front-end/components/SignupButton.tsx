import Link from "next/link";
import styles from "@/styles/buttons/SignupButton.module.css";

export default function SignupButton() {
  return (
    <Link href="/register">
      <button className={`${styles.sharedButton} ${styles.signupButton}`}>
        Sign Up
      </button>
    </Link>
  );
}
