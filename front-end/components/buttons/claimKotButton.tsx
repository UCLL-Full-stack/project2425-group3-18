import React from 'react';
import styles from '@/styles/koten/koten.module.css';

interface ClaimKotButtonProps {
  kotId: number;
  username: string;
  onClick: () => void;
}

const ClaimKotButton: React.FC<ClaimKotButtonProps> = ({ kotId, username, onClick }) => {
  return (
    <button
      className={styles.claimButton}
      onClick={onClick}
    >
      Claim this Kot
    </button>
  );
};

export default ClaimKotButton;
