import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PostData } from "@/types";
import styles from "@/styles/contentGrid/contentGrid.module.css";
import PostService from "@/services/PostService";

interface ContentGridProps {
  username: string;
}

const ContentGrid: React.FC<ContentGridProps> = ({ username }) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await PostService.getAllPosts();

        const postsWithIds = fetchedPosts.map((post: any, index: number) => ({
          ...post,
          id: post.id || index + 1,
        }));

        // Filter posts by the provided username
        const userPosts = postsWithIds.filter((post) => post.profile.username === username);

        setPosts(userPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [username]);

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
      {posts.map((post) =>
        post.id !== undefined ? (
          <div
            key={post.id}
            className={styles.card}
            onClick={() => viewDetails(post.id as number)}
          >
            <img
              src={post.image}
              alt={post.description}
              className={styles.image}
            />
            <h3>{post.profile.username}</h3>
            <p>{post.description}</p>
          </div>
        ) : null
      )}
    </div>
  );
};

export default ContentGrid;
