import React, { useState } from 'react';
import styles from '@/styles/koten/koten.module.css';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout/Layoutwrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR, { mutate } from 'swr';
import { kotService } from '@/services/KotService';
import { Kot } from '@/types';
import ClaimKotButton from '@/components/buttons/claimKotButton';

const fetcher = (url: string) => kotService.getAllKoten();
const userFetcher = () => {
  if (typeof window !== 'undefined') {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
    return loggedInUser.username || null;
  }
  return null;
};

const KotenPage: React.FC = () => {
  const { t } = useTranslation();
  
  const { data: kotenData, error: kotenError } = useSWR('/koten', fetcher);
  
  const { data: loggedInUsername, error: userError } = useSWR('loggedInUser', userFetcher);

  const [claimedKots, setClaimedKots] = useState<{ [kotId: number]: boolean }>({});

  if (kotenError || userError) {
    return <p className={styles.error}>Failed to load koten or user data.</p>;
  }

  if (!kotenData || !loggedInUsername) {
    return <p>Loading...</p>;
  }

  const handleClaimKot = (kotId: number, username: string) => {
    kotService.addProfileToKot(kotId, username)
      .then(result => {
        console.log('Profile added to kot:', result);
        setClaimedKots(prevState => ({ ...prevState, [kotId]: true }));

        mutate('/koten');

      })
      .catch(error => {
        console.error('Error adding profile to kot:', error);
      });
  };

  return (
    <Layout>
      <div className={styles.kotenPage}>
        <h1>{t('kotenPage.title')}</h1>
        <div className={styles.kotenGrid}>
          {kotenData.map((koten: Kot) => {
            const isUserClaimed = koten.profiles.some(profile => profile.username === loggedInUsername);
            const isAlreadyClaimed = claimedKots[koten.id];

            return (
              <div key={koten.id} className={styles.kotenCard}>
                <div className={styles.kotenTitle}>
                  <h2>{`${koten.location.city}, ${koten.location.street} ${koten.location.housenumber}`}</h2>
                  <div className={styles.profileList}>
                    {koten.profiles.map((profile) => (
                      <p key={profile.username} className={styles.username}>
                        {profile.username}
                      </p>
                    ))}
                  </div>
                </div>
                <div className={styles.kotenInfo}>
                  <p>
                    <strong>{t('kotenPage.price')}: </strong>€{koten.price}
                  </p>
                  <p>
                    <strong>{t('kotenPage.surfaceSpace')}: </strong>
                    {koten.surfaceSpace} m²
                  </p>
                </div>
                {!isAlreadyClaimed && !isUserClaimed && (
                  <ClaimKotButton
                    kotId={koten.id}
                    username={loggedInUsername}
                    onClick={() => handleClaimKot(koten.id, loggedInUsername)}
                  />
                )}
              </div>
            );
          })}
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
