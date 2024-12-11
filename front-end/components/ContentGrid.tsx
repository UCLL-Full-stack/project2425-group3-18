import React from "react";
import { useRouter } from "next/router";

const ContentGrid: React.FC = () => {
    const examplePosts = [
        { postId: 1, title: "Post 1", images: ["/img/posts/kot1.jpg", "/img/posts/kot1-2.jpg"], description: "Example description 1" },
        { postId: 2, title: "Post 2", images: ["/img/posts/kot2.jpg", "/img/posts/kot2-2.jpg"], description: "Example description 2" },
    ];

    const router = useRouter();

    const viewDetails = (postId: number) => {
        router.push(`/post/${postId}`);
    };

    return (
        <div style={styles.grid}>
            {examplePosts.map((post) => (
                <div key={post.postId} style={styles.card}>
                    <img
                        src={post.images[0]}
                        alt={post.title}
                        style={styles.image}
                        onClick={(e) => e.stopPropagation()}
                        onDoubleClick={() => viewDetails(post.postId)}
                    />
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>

                    <div style={styles.iconContainer}>
                    </div>
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
        cursor: "pointer",
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
