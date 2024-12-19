import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ContentGridProps } from "@/types";
import styles from "@/styles/contentGrid/contentGrid.module.css";
import { useTranslation } from "next-i18next";
import useSWR from "swr";
import PostCard from "./PostCard";
import { PostService } from "@/services/PostService";

// Fetch posts, optionally filtering by the search query
const fetchPosts = async (username: string | undefined, searchQuery: string | undefined) => {
  try {
    let fetchedPosts = await PostService.getAllPosts();

    // If there's a search query, filter the posts based on description or username
    if (searchQuery && searchQuery.trim() !== "") {
      fetchedPosts = fetchedPosts.filter((post: any) =>
        post.profile.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // If a username is provided, filter posts for that user
    if (username) {
      fetchedPosts = fetchedPosts.filter((post: any) => post.profile.username === username);
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

  const [usernameState, setUsernameState] = useState<string | undefined>(username);

  // Use useEffect to safely access sessionStorage only on the client-side
  useEffect(() => {
    if (!username) {
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
      setUsernameState(loggedInUser?.username || undefined);
    }
  }, [username]);

  // Fetch posts using SWR
  const { data: posts, error } = useSWR([usernameState, searchQuery], () => fetchPosts(usernameState || "", searchQuery), {
    revalidateOnFocus: false, // Optionally prevent refetching when the window is refocused
    onError: (err) => {
      console.error("Error fetching posts:", err);
    },
  });

  // Navigate to the post details page
  const viewDetails = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  // Show loading message while posts are being fetched
  if (!posts) {
    return <p>{t("contentGrid.loading")}</p>;
  }

  // Show error message if fetching fails
  if (error) {
    return <p>{t("contentGrid.error")}</p>;
  }

  // Show message if no posts are found
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
            username={usernameState}
            onClick={viewDetails}
          />
        ) : null
      )}
    </div>
  );
};

export default ContentGrid;
