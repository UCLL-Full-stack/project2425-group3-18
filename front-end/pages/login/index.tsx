import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from "@/styles/login/Login.module.css";
import Link from 'next/link';
import UserService from '@/services/UserService';

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<string>('');
  const [users, setUsers] = useState<Array<{ userName: string; email: string; password: string; }>>([]);

  const getAllUsers = async () => {
    const response = await UserService.getAllUsers();
    if (response.ok) {
      const usersData = await response.json();
      setUsers(usersData);
    } else {
      setErrorMessage('Failed to fetch users.');
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const user = users.find((user) => 
      (user.userName === username || user.email === email) && user.password === password
    );

    if (!user) {
      setLoginMessage('Incorrect information.');
      setErrorMessage('');
    } else {
      setLoginMessage(`Logged in as ${user.userName}`);
      setErrorMessage('');
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      {loginMessage && <p className={styles.loginMessage}>{loginMessage}</p>} {}
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={handleInputChange(setUsername)}
            className={styles.input}
            placeholder="Enter your username"
            required
          />
        </div>
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
        <button type="submit" className={styles.button}>Login</button>
      </form>

      <div className={styles.signupLink}>
        <p>Don't have an account? <a href="/register">Sign Up here</a></p>
      </div>
    </div>
  );
}
