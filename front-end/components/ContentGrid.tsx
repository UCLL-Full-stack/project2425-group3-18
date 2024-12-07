import React, { useState } from "react";
import CommentSection from "./CommentSection";

const ContentGrid: React.FC = () => {
    const [comments, setComments] = useState<{ [key: number]: string[] }>({});
    const [openPostId, setOpenPostId] = useState<number | null>(null);

    const examplePosts = [
        { postId: 1, title: "Post 1", image: "/img/posts/kot1.jpg", description: "Example description 1" },
        { postId: 2, title: "Post 2", image: "/img/posts/kot2.jpg", description: "Example description 2" },
    ];

    const handleAddComment = (postId: number, newComment: string) => {
        setComments((prevComments) => {
            const updatedComments = { ...prevComments };
            if (updatedComments[postId]) {
                updatedComments[postId].push(newComment);
            } else {
                updatedComments[postId] = [newComment];
            }
            return updatedComments;
        });
    };

    const toggleCommentSection = (postId: number) => {
        setOpenPostId(openPostId === postId ? null : postId);
    };

    return (
        <div style={styles.grid}>
            {examplePosts.map((post) => (
                <div key={post.postId} style={styles.card}>
                    <img src={post.image} alt={post.title} style={styles.image} />
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>

                    <div style={styles.iconContainer}>
                        <button style={styles.iconButton}>
                            <img src="/img/like.png" alt="Like" style={styles.icon} />
                        </button>
                        <button
                            style={styles.iconButton}
                            onClick={() => toggleCommentSection(post.postId)}
                        >
                            <img
                                src="/img/comment.png"
                                alt="Comment"
                                style={styles.icon}
                            />
                        </button>
                    </div>

                    {openPostId === post.postId && (
                        <CommentSection
                            postId={post.postId}
                            onAddComment={handleAddComment}
                            comments={comments[post.postId] || []}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    grid: {
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    },
    card: {
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "8px",
        marginBottom: "1rem",
    },
    iconContainer: {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        marginBottom: "1rem",
    },
    iconButton: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
    },
    icon: {
        width: "24px",
        height: "24px",
    },
};

export default ContentGrid;
