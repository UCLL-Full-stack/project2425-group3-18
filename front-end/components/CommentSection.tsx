import React, { useState } from "react";

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
        <div style={styles.commentSection}>
            <h4>Comments</h4>
            <div style={styles.commentList}>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} style={styles.commentItem}>
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
                style={styles.commentInput}
            />
            <button onClick={handleAddComment} style={styles.addButton}>
                Add Comment
            </button>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    commentSection: {
        marginTop: "10px",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    commentList: {
        marginBottom: "1rem",
        maxHeight: "200px",
        overflowY: "auto",
    },
    commentItem: {
        padding: "0.5rem",
        borderBottom: "1px solid #ddd",
    },
    commentInput: {
        width: "100%",
        height: "50px",
        padding: "0.5rem",
        borderRadius: "8px",
        border: "1px solid #ddd",
        resize: "none",
    },
    addButton: {
        marginTop: "10px",
        padding: "0.5rem 1rem",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default CommentSection;
