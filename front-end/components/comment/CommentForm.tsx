import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import styles from "@/styles/commentSection/CommentSection.module.css";
import RatingStars from "./RatingStars";

interface CommentFormProps {
    onAddComment: (text: string, rating: number, username: string) => void;
}

const getUsername = () => {
    return JSON.parse(sessionStorage.getItem("loggedInUser") || "{}").username;
};

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
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
        onAddComment(newComment, rating, userName);
        setNewComment("");
        setRating(0);
        setErrorMessage("");
    };

    return (
        <div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t("comments.add_comment_placeholder")}
                className={styles.commentInput}
            />
            <RatingStars rating={rating} onClick={(index) => setRating(index + 1)} />
            <button onClick={handleAddComment} className={styles.addButton}>
                {t("comments.add_comment_button")}
            </button>
        </div>
    );
};

export default CommentForm;
