import React from "react";
import styles from "@/styles/contentGrid/contentGrid.module.css";
import PostSettings from "../contentGrid/PostSettings";
import { PostCardProps } from "@/types";

const PostCard: React.FC<PostCardProps> = ({ post, username, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(post.id)}>
      <img src={post.image} alt={post.description} className={styles.image} />
      <h3>{post.profile.username}</h3>
      <p>{post.description}</p>
    </div>
  );
};

export default PostCard;
