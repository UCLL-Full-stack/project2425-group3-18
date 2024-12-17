import UserService from '@/services/UserService';
import React, { useState, FormEvent } from 'react';
import styles from "@/styles/register/Register.module.css";
import { ErrorOutline } from '@mui/icons-material';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('User');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Email validation function
  const validateEmail = (email: string): string => {
    if (!email || email.trim() === '') {
      throw new Error('Email cannot be empty');
    }
    const emailRegex = /^[^\s@]+@[^\s@]*\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new Error('Email is not valid');
    }
    return email;
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Check if all required fields are filled
      if (!firstName) {
        throw new Error('Please fill in the first name field');
      }
      if (!lastName) {
        throw new Error('Please fill in the last name field');
      }
      if (!email) {
        throw new Error('Please fill in the email field');
      }
      if (!password) {
        throw new Error('Please fill in the password field');
      }
      if (!username) {
        throw new Error('Please fill in the username field');
      }

      // Validate email
      validateEmail(email);

      // Register user and create profile
      const userResponse = await UserService.registerUser({
        firstName,
        lastName,
        email,
        password,
      });

      const profileResponse = await UserService.createProfile({
        username,
        bio,
        role,
        email,
      });

      if (userResponse && profileResponse) {
        window.location.href = '/login';
      } else {
        throw new Error('Registration failed, please try again');
      }
    } catch (error: any) {
      setIsSubmitting(false);

      if (error instanceof Error) {
        setError(error.message || 'An unexpected error occurred');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      {error && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: 'red',
          }}
        >
          <ErrorOutline fontSize="small" />
          {error}
        </span>
      )}
      <form className={styles.form} onSubmit={handleRegister}>
        <div className={styles.inputGroup}>
          <label>First Name</label>
          <input
            type="text"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Last Name</label>
          <input
            type="text"
            className={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={passwordVisible ? 'text' : 'password'}
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <img src="/img/eye-password-hide.svg" alt="Toggle password visibility" />
            </button>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>Username</label>
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Bio</label>
          <textarea
            className={styles.input}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Role</label>
          <select
            className={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className={styles.loginLink}>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default RegisterForm;
