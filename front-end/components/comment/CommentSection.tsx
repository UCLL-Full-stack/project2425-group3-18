import React, { useState, useEffect } from 'react';
import { CommentService } from '@/services/CommentService';
import { Comment, CommentRequestBody } from '@/types';
import styles from "@/styles/commentSection/CommentSection.module.css";

interface CommentSectionProps {
  postId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const fetchedComments = await CommentService.getCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (error) {
        setError("Failed to load comments");
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    const username = loggedInUser.username;

    const commentData: CommentRequestBody = {
      postId,
      commentCreate: {
        text: newComment.trim(),
        username,
      },
    };

    try {
      const createdComment = await CommentService.createComment(commentData);
      setComments((prevComments) => [createdComment, ...prevComments]);
      setNewComment('');
    } catch (error) {
      setError("Failed to post comment");
    }
  };

  return (
    <div className={styles.commentSection}>
      <h2>Comments</h2>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentAuthor}>
                <strong>{comment.profile.username}</strong>
              </div>
              <p className={styles.commentContent}>{comment.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className={styles.commentInput}>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          className={styles.textarea}
        />
        <button onClick={handleSubmitComment} className={styles.submitButton}>Post Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;
