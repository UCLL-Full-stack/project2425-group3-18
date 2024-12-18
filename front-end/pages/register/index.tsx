import React, { useState, FormEvent } from 'react';
import styles from "@/styles/register/Register.module.css";
import { ErrorOutline } from '@mui/icons-material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { UserService } from '@/services/UserService';

const RegisterForm = () => {
  const { t } = useTranslation();
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

  const validateEmail = (email: string): string => {
    if (!email || email.trim() === '') {
      throw new Error(t('register.emailEmpty'));
    }
    const emailRegex = /^[^\s@]+@[^\s@]*\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new Error(t('register.invalidEmail'));
    }
    return email;
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!firstName) {
        throw new Error(t('register.firstNameRequired'));
      }
      if (!lastName) {
        throw new Error(t('register.lastNameRequired'));
      }
      if (!email) {
        throw new Error(t('register.emailRequired'));
      }
      if (!password) {
        throw new Error(t('register.passwordRequired'));
      }
      if (!username) {
        throw new Error(t('register.usernameRequired'));
      }

      validateEmail(email);

      await UserService.registerUserWithProfile(
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          username,
          bio,
          role,
        }
      );

      window.location.href = '/login';
    } catch (error: any) {
      setIsSubmitting(false);
      if (error instanceof Error) {
        setError(error.message || t('register.unexpectedError'));
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('register.title')}</h1>
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
          <label>{t('register.firstName')}</label>
          <input
            type="text"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>{t('register.lastName')}</label>
          <input
            type="text"
            className={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>{t('register.email')}</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>{t('register.password')}</label>
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
              <img src="/img/eye-password-hide.svg" alt={t('register.togglePasswordVisibility')} />
            </button>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>{t('register.username')}</label>
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>{t('register.bio')}</label>
          <textarea
            className={styles.input}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>{t('register.role')}</label>
          <select
            className={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">{t('register.user')}</option>
            <option value="Admin">{t('register.admin')}</option>
          </select>
        </div>

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? t('register.registering') : t('register.register')}
        </button>
      </form>

      <div className={styles.loginLink}>
        <p>{t('register.alreadyHaveAccount')} <a href="/login">{t('register.loginHere')}</a></p>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default RegisterForm;
