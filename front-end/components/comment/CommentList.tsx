import React from "react";
import CommentItem from "./CommentItem";
import { Comment } from "@/types";
import styles from "@/styles/commentSection/CommentSection.module.css";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className={styles.commentList}>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
                key={comment.id}
                username={comment.profile?.username || ""} 
                text={comment.text} rating={0}          />
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentList;
