import React, { useState } from "react";
import styles from "@/styles/commentSection/CommentSection.module.css";

interface CommentSectionProps {
    postId: number;
    comments: string[];
    onAddComment: (postId: number, newComment: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, onAddComment }) => {
    const [newComment, setNewComment] = useState<string>("");

    const handleAddComment = () => {
        if (newComment.trim() !== "") {
            onAddComment(postId, newComment);
            setNewComment("");
        }
    };

    return (
        <div className={styles.commentSection}>
            <h4>Comments</h4>
            <div className={styles.commentList}>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className={styles.commentItem}>
                            <p>{comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className={styles.commentInput}
            />
            <button onClick={handleAddComment} className={styles.addButton}>
                Add Comment
            </button>
        </div>
    );
};

export default CommentSection;
