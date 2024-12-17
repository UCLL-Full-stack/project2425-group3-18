import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PostData } from "@/types";
import styles from "@/styles/contentGrid/contentGrid.module.css";
import PostService from "@/services/PostService";

const ContentGrid: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await PostService.getAllPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const viewDetails = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.grid}>
      {posts.map((post, index) => (
        <div
          key={index}
          className={styles.card}
          onClick={() => viewDetails(index)}
        >
          <img
            src={post.image}
            alt={post.description}
            className={styles.image}
          />
          <h3>{post.profile.username}</h3>
          <p>{post.description}</p>

          <div className={styles.iconContainer}></div>
        </div>
      ))}
    </div>
  );
};

export default ContentGrid;
