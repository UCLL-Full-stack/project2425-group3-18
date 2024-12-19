import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styles from '@/styles/buttons/addKotButton.module.css';

const AddKotButton: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleClick = () => {
    router.push('/addKot');
  };

  return (
    <button className={styles.addKotButton} onClick={handleClick}>
      {t("header.addKotText")}
    </button>
  );
};

export default AddKotButton;
