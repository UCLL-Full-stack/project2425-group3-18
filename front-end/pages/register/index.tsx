import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from "@/styles/register/Register.module.css";
import Link from 'next/link';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      bio,
      role,
      userName,
      email,
      password,
    });
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form onSubmit={handleRegister} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={handleInputChange(setFirstName)}
            className={styles.input}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={handleInputChange(setLastName)}
            className={styles.input}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Bio</label>
          <textarea
            value={bio}
            onChange={handleInputChange(setBio)}
            className={styles.input}
            placeholder="Tell us about yourself"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Role</label>
          <input
            type="text"
            value={role}
            onChange={handleInputChange(setRole)}
            className={styles.input}
            placeholder="Enter your role (e.g., lecturer, student)"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={handleInputChange(setUserName)}
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
        <button type="submit" className={styles.button}>Register</button>
        <div className={styles.loginLink}>
          <Link href="/login">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
