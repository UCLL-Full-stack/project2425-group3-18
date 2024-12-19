import React from "react";
import styles from "@/styles/commentSection/CommentSection.module.css";

interface CommentItemProps {
    username: string;
    text: string;
    rating: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ username, text, rating }) => {
    return (
        <div className={styles.commentItem}>
            <p><strong>{username}</strong>: {text}</p>
            <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                    <img
                        key={i}
                        src="/img/star.webp"
                        alt={`Star ${i + 1}`}
                        className={i < rating ? styles.filledStar : styles.emptyStar}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentItem;
