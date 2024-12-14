import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/contentGrid/contentGrid.module.css";

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
        <div className={styles.grid}>
            {examplePosts.map((post) => (
                <div
                    key={post.postId}
                    className={styles.card}
                    onClick={() => viewDetails(post.postId)}
                >
                    <img
                        src={post.images[0]}
                        alt={post.title}
                        className={styles.image}
                        onClick={(e) => viewDetails(post.postId)}
                    />
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>

                    <div className={styles.iconContainer}></div>
                </div>
            ))}
        </div>
    );
};

export default ContentGrid;
