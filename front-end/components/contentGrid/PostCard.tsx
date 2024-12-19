import React from "react";
import styles from "@/styles/contentGrid/contentGrid.module.css";
import PostSettings from "./PostSettings";

interface PostCardProps {
  post: any;
  username: string | undefined;
  onClick: (postId: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, username, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(post.id)}>
      <img src={post.image} alt={post.description} className={styles.image} />
      <h3>{post.profile.username}</h3>
      <p>{post.description}</p>

      {post.profile.username === username && (
        <PostSettings postId={post.id} />
      )}
    </div>
  );
};

export default PostCard;
