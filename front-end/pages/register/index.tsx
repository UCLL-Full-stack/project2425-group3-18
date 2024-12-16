import UserService from '@/services/UserService';
import React, { useState, FormEvent } from 'react';
import styles from "@/styles/register/Register.module.css";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('User');

  interface ProfileData {
    username: string;
    bio: string;
    role: string;
  }
  
  interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profile: ProfileData;
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
  
    const userData: UserData = {
      firstName,
      lastName,
      email,
      password,
      profile: {
        username,  // profile-related information
        bio,
        role,
      }
    };
  
    console.log("Sending user data for registration:", userData);
  
    try {
      const user = await UserService.createUser(userData);
      console.log('User created successfully:', user);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.form} onSubmit={handleRegister}>
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
          <label>Username</label>
          <input 
            type="text" 
            className={styles.input} 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
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
            <option value="User">User</option>
            <option value="Admin">Admin</option>
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
