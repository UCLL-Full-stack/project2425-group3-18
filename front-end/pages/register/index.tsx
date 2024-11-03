import UserService from '@/services/UserService';
import React, { useState, FormEvent } from 'react';
import styles from "@/styles/register/Register.module.css";

const RegisterForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('User');

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    const userData = {
      user: {
        userName,
        email,
        password,
      },
      profile: {
        firstName,
        lastName,
        bio,
        role,
        posts: [],
        koten: [],
      },
    };

    try {
      const response = await UserService.createUser(userData);
      console.log('User registered successfully:', response);
    } catch (error: any) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.form} onSubmit={handleRegister}>
        <div className={styles.inputGroup}>
          <label>User Name</label>
          <input 
            type="text" 
            className={styles.input} 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input 
            type="email" 
            className={styles.input} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input 
            type="password" 
            className={styles.input} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.inputGroup}>
          <label>First Name</label>
          <input 
            type="text" 
            className={styles.input} 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Last Name</label>
          <input 
            type="text" 
            className={styles.input} 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
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
            <option value="Student">User</option>
            <option value="Rental">Admin</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Register</button>
      </form>
      
      <div className={styles.loginLink}>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default RegisterForm;
