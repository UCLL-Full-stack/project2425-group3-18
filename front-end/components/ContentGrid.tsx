import React from "react";
import { useRouter } from "next/router";
import { ContentGridProps, PostData } from "@/types";
import styles from "@/styles/contentGrid/contentGrid.module.css";
import PostService from "@/services/PostService";
import { useTranslation } from "next-i18next";
import useSWR from "swr";

const fetchPosts = async (username: string | undefined, filterByUsername: boolean) => {
  try {
    const fetchedPosts = await PostService.getAllPosts();
    const postsWithIds = fetchedPosts.map((post: any, index: number) => ({
      ...post,
      id: post.id || index + 1,
    }));

    return filterByUsername
      ? postsWithIds.filter((post) => post.profile.username === username)
      : postsWithIds;
  } catch (err) {
    throw new Error("Error fetching posts");
  }
};

const ContentGrid: React.FC<ContentGridProps> = ({ username, filterByUsername = false }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: posts, error } = useSWR([username, filterByUsername], fetchPosts, {
    onError: (err) => {
      console.error("Error fetching posts:", err);
    },
  });

  const viewDetails = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  if (!posts) {
    return <p>{t("contentGrid.loading")}</p>;
  }

  if (error) {
    return <p>{t("contentGrid.error")}</p>;
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
