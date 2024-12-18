import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ContentGridProps } from "@/types";
import styles from "@/styles/contentGrid/contentGrid.module.css";
import { useTranslation } from "next-i18next";
import useSWR from "swr";
import DeletePostButton from "./deletePostButton";
import { PostService } from "@/services/PostService";

const fetchPosts = async (username: string | undefined) => {
  try {
    if (username) {
      const fetchedPosts = await PostService.getPostsByUsername(username);
      const postsWithIds = fetchedPosts.map((post: any, index: number) => ({
        ...post,
        id: post.id || index + 1,
      }));
      return postsWithIds;
    } else {
      const fetchedPosts = await PostService.getAllPosts();
      const postsWithIds = fetchedPosts.map((post: any, index: number) => ({
        ...post,
        id: post.id || index + 1,
      }));
      return postsWithIds;
    }
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw new Error("Error fetching posts");
  }
};

const ContentGrid: React.FC<ContentGridProps> = ({ username }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [deleteButtonVisible, setDeleteButtonVisible] = useState<number | null>(null);
  const settingsButtonRef = useRef<HTMLButtonElement | null>(null);
  const deleteButtonRef = useRef<HTMLButtonElement | null>(null);

  const { data: posts, error } = useSWR([username], fetchPosts, {
    onError: (err) => {
      console.error("Error fetching posts:", err);
    },
  });

  const viewDetails = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  const handleDeleteButtonToggle = (postId: number) => {
    setDeleteButtonVisible(postId === deleteButtonVisible ? null : postId);
  };

  const handleDeletePost = (postId: number) => {
    setDeleteButtonVisible(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      settingsButtonRef.current &&
      !settingsButtonRef.current.contains(event.target as Node) &&
      deleteButtonRef.current &&
      !deleteButtonRef.current.contains(event.target as Node)
    ) {
      setDeleteButtonVisible(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

            {post.profile.username === username && (
              <div className={styles.settingsIconContainer}>
                <button
                  className={styles.settingsButton}
                  ref={settingsButtonRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteButtonToggle(post.id as number);
                  }}
                >
                  &#8226;&#8226;&#8226;
                </button>

                {deleteButtonVisible === post.id && (
                  <div className={styles.deleteButtonWrapper}>
                    <DeletePostButton
                      postId={post.id as number}
                      onDelete={() => handleDeletePost(post.id as number)}
                      ref={deleteButtonRef}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : null
      )}
    </div>
  );
};

export default ContentGrid;
