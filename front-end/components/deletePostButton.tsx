import React, { forwardRef } from "react";
import styles from "@/styles/buttons/deletePostButton.module.css";
import { useTranslation } from "next-i18next";
import { DeletePostButtonProps } from "@/types";
import { PostService } from "@/services/PostService";

const DeletePostButton = forwardRef<HTMLButtonElement, DeletePostButtonProps>(
  ({ postId, onDelete }, ref) => {
    const { t } = useTranslation();

    const handleDeletePost = async () => {
      try {
        await PostService.deletePost(postId);
        onDelete();
        alert(t("deletePost.deletedSuccess"));
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert(t("deletePost.deletedError"));
      }
    };

    return (
      <button
        ref={ref}
        className={styles.deleteButton}
        onClick={(e) => {
          e.stopPropagation();
          handleDeletePost();
        }}
      >
        {t("deletePost.deleteButton")}
      </button>
    );
  }
);

export default DeletePostButton;
