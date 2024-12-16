import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for redirection
import styles from "@/styles/login/Login.module.css";
import UserService from '@/services/UserService';

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<string>('');
  const [users, setUsers] = useState<Array<{ 
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string; 
    profile: { 
      username: string; 
      bio: string; 
      role: string; 
    }; 
  }>>([]);
  
  const router = useRouter(); // Initialize useRouter for navigation

  // Fetch all users (could be replaced by a more robust method)
  const getAllUsers = async () => {
    const response = await UserService.getAllUsers();
    if (response.ok) {
      const usersData = await response.json();
      setUsers(usersData);
    } else {
      setErrorMessage('Failed to fetch users.');
    }
  };

  // Handle login logic
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const user = users.find((user) => 
      (user.profile.username === username || user.email === email) && user.password === password
    );

    if (!user) {
      setLoginMessage('Incorrect information.');
      setErrorMessage('');
    } else {
      setLoginMessage(''); // Clear login message on successful login
      setErrorMessage('');
      
      // Store login state (set to true on successful login)
      localStorage.setItem("isLoggedIn", "true");

      // Optionally store user data (this could be user profile or JWT token)
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to the home page after successful login
      router.push('/'); // Navigates to the home page
    }
  };

  // Fetch users on mount
  useEffect(() => {
    getAllUsers();
  }, []);

  // Handle input change for all form fields
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      {loginMessage && <p className={styles.loginMessage}>{loginMessage}</p>}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
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
