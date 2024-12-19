import React from "react";
import CommentList from "./CommentList";
import { Comment } from "@/types";
import styles from "@/styles/commentSection/CommentSection.module.css";

interface CommentSectionProps {
  postId: number;
  onAddComment: (postId: number, newComment: { text: string; rating: number }) => void;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, onAddComment, comments }) => {
  const handleAddComment = (text: string, rating: number) => {
    onAddComment(postId, { text, rating });
  };

  return (
    <div className={styles.commentSection}>
      <h3>Comments</h3>
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSection;
