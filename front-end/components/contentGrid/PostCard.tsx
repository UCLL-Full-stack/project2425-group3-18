import React from "react";
import styles from "@/styles/contentGrid/contentGrid.module.css";
import PostSettings from "./PostSettings";
import { PostCardProps } from "@/types";

const PostCard: React.FC<PostCardProps> = ({ post, username, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(post.id)}>
      <img src={post.image} alt={post.description} className={styles.image} />
      <h3>{post.profile.username}</h3>
      <p>{post.description}</p>

      {/* Check if username is provided and whether it matches the post's username */}
      {username && post.profile.username === username && (
        <PostSettings postId={post.id} />
      )}
    </div>
  );
};

export default PostCard;
