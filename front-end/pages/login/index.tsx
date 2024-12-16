import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/login/Login.module.css";
import UserService from "@/services/UserService";
import { User } from "@/types";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      setErrorMessage("");
    
      try {
        const user: Partial<User> = { email, password };
    
        const response = await UserService.loginUser(user as User);
    
        if (response.token) {
          localStorage.setItem(
            "authToken",
            JSON.stringify({
              token: response.token,
              fullname: `${response.firstName} ${response.lastName}`,
              email: email,
            })
          );
    
          router.push("/");
        } else {
          setErrorMessage("Invalid credentials. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    };
    

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleInputChange(setEmail)}
            className={styles.input}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handleInputChange(setPassword)}
            className={styles.input}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

      <div className={styles.signupLink}>
        <p>Don't have an account? <a href="/register">Sign Up here</a></p>
      </div>
    </div>
  );
}
