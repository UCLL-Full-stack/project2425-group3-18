import React from "react";
import styles from "@/styles/commentSection/CommentSection.module.css";

interface RatingStarsProps {
    rating: number;
    onClick: (index: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, onClick }) => {
    return (
        <div className={styles.ratingContainer}>
            {[...Array(5)].map((_, i) => (
                <img
                    key={i}
                    src="/img/star.webp"
                    alt={`Star ${i + 1}`}
                    className={i < rating ? styles.filledStar : styles.emptyStar}
                    onClick={() => onClick(i)}
                />
            ))}
        </div>
    );
};

export default RatingStars;
