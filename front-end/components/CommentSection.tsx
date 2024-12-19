import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import styles from "@/styles/commentSection/CommentSection.module.css";

const getUsername = () => {
    return JSON.parse(sessionStorage.getItem("loggedInUser") || "{}").username;
};

interface CommentSectionProps {
    postId: number;
    comments: { text: string; rating: number; username: string }[];
    onAddComment: (postId: number, newComment: { text: string; rating: number; username: string }) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, onAddComment }) => {
    const { t } = useTranslation();
    const [newComment, setNewComment] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleAddComment = () => {
        if (newComment.trim() === "" || rating === 0) {
            setErrorMessage(t("comments.error_message"));
            return;
        }

        const userName = getUsername();

        onAddComment(postId, { text: newComment, rating, username: userName });

        setNewComment("");
        setRating(0);
        setErrorMessage("");
    };

    const handleStarClick = (index: number) => {
        if (rating === index + 1) {
            setRating(0);
        } else {
            setRating(index + 1);
        }
    };

    return (
        <div className={styles.commentSection}>
            <h4>{t("comments.comments")}</h4>
            <div className={styles.commentList}>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className={styles.commentItem}>
                            <p><strong>{comment.username}</strong>: {comment.text}</p>
                            <div className={styles.rating}>
                                {[...Array(5)].map((_, i) => (
                                    <img
                                        key={i}
                                        src="/img/star.webp"
                                        alt={`${t("comments.star")} ${i + 1}`}
                                        className={i < comment.rating ? styles.filledStar : styles.emptyStar}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>{t("comments.no_comments")}</p>
                )}
            </div>

            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t("comments.add_comment_placeholder")}
                className={styles.commentInput}
            />
            <div className={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                    <img
                        key={i}
                        src="/img/star.webp"
                        alt={`${t("comments.star")} ${i + 1}`}
                        className={i < rating ? styles.filledStar : styles.emptyStar}
                        onClick={() => handleStarClick(i)}
                    />
                ))}
            </div>
            <button onClick={handleAddComment} className={styles.addButton}>
                {t("comments.add_comment_button")}
            </button>
        </div>
    );
};

export default CommentSection;
