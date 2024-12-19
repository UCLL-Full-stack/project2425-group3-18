import React from 'react';
import styles from '@/styles/koten/koten.module.css';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout/Layoutwrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';
import { kotService } from '@/services/KotService';
import { Kot } from '@/types';

const fetcher = (url: string) => kotService.getAllKoten(); 

const KotenPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: kotenData, error } = useSWR('/koten', fetcher);

  if (error) return <p className={styles.error}>Failed to load koten.</p>;
  if (!kotenData) return <p>Loading...</p>;

  return (
    <Layout>
      <div className={styles.kotenPage}>
        <h1>{t('kotenPage.title')}</h1>
        <div className={styles.kotenGrid}>
          {kotenData.map((koten: Kot) => (
            <div key={koten.id} className={styles.kotenCard}>
              <div className={styles.kotenTitle}>
                <h2>{`${koten.location.city}, ${koten.location.street} ${koten.location.housenumber}`}</h2>
                <p className={styles.username}>{koten.profiles[0].username}</p>
              </div>
              <div className={styles.kotenInfo}>
                <p><strong>{t('kotenPage.price')}: </strong>€{koten.price}</p>
                <p><strong>{t('kotenPage.surfaceSpace')}: </strong>{koten.surfaceSpace} m²</p>
              </div>
              <div className={styles.profile}></div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default KotenPage;
