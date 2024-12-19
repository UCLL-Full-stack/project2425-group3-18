import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ContentGridProps } from "@/types";
import styles from "@/styles/contentGrid/contentGrid.module.css";
import { useTranslation } from "next-i18next";
import useSWR from "swr";
import PostCard from "./PostCard";
import { PostService } from "@/services/PostService";

// Fetch posts, optionally filtering by the search query and username
const fetchPosts = async (username: string | undefined, searchQuery: string | undefined) => {
  try {
    let fetchedPosts = await PostService.getAllPosts();

    // Filter posts by logged-in user if username is provided
    if (username) {
      fetchedPosts = fetchedPosts.filter((post: any) => post.profile.username === username);
    }

    // If there's a search query, filter the posts based on description or username
    if (searchQuery && searchQuery.trim() !== "") {
      fetchedPosts = fetchedPosts.filter((post: any) =>
        post.profile.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Add an id to each post if it doesn't already exist
    const postsWithIds = fetchedPosts.map((post: any, index: number) => ({
      ...post,
      id: post.id || index + 1,
    }));

    return postsWithIds;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw new Error("Error fetching posts");
  }
};

const ContentGrid: React.FC<ContentGridProps> = ({ username, searchQuery }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: posts, error } = useSWR([username, searchQuery], () => fetchPosts(username, searchQuery), {
    revalidateOnFocus: false,
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

  if (posts.length === 0) {
    return <p>{t("contentGrid.noPostsFound")}</p>;
  }

  return (
    <div className={styles.grid}>
      {posts.map((post) =>
        post.id !== undefined ? (
          <PostCard
            key={post.id}
            post={post}
            onClick={viewDetails}
            username={username}
          />
        ) : null
      )}
    </div>
  );
};

export default ContentGrid;
