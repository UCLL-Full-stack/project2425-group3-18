import React from 'react';
import styles from "@/styles/share/share.module.css";
import { useTranslation } from 'next-i18next';

interface ShareModalProps {
  postTitle: string;
  postUrl: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ postTitle, postUrl, onClose }) => {
  const { t } = useTranslation();

  const handleShareFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleShareTwitter = () => {
    const shareUrl = `https://x.com/intent/post?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleShareWhatsApp = () => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(postTitle)}%20${encodeURIComponent(postUrl)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 id='share-h2'>{t('shareModal.title')}</h2>
          <button className={styles.closeButton} onClick={onClose}>{t('shareModal.close')}</button>
        </div>
        <div className={styles.socialButtons}>
          <button onClick={handleShareFacebook} className={styles.socialButton}>
            <img src="/img/facebook.png" alt="Facebook" className={styles.icon} />
            {t('shareModal.facebook')}
          </button>
          <button onClick={handleShareTwitter} className={styles.socialButton}>
            <img src="/img/x.webp" alt="X" className={styles.icon} />
            {t('shareModal.x')}
          </button>
          <button onClick={handleShareWhatsApp} className={styles.socialButton}>
            <img src="/img/whatsapp.png" alt="WhatsApp" className={styles.icon} />
            {t('shareModal.whatsapp')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
