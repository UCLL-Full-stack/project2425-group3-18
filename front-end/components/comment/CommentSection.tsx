import React, { useState, useEffect } from 'react';
import { CommentService } from '@/services/CommentService';
import { CommentRequestBody, Comment as CommentType } from '@/types';
import styles from "@/styles/commentSection/CommentSection.module.css";

interface CommentSectionProps {
  postId: number;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, setComments }) => {
  const [newComment, setNewComment] = useState<string>('');
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [localComments, setLocalComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const fetchedComments = await CommentService.getCommentsByPostId(postId);
        setLocalComments(fetchedComments);
        setComments(fetchedComments);
      } catch (error) {
        setError("Failed to load comments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId, setComments]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleRatingClick = (selectedRating: number) => {
    setSelectedStars(selectedRating);
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    const username = loggedInUser.username || "Anonymous";

    const commentData: CommentRequestBody = {
      postId,
      commentCreate: {
        text: newComment.trim(),
        username,
        rating: selectedStars,
      },
    };

    try {
      await CommentService.createComment(commentData);

      const fetchedComments = await CommentService.getCommentsByPostId(postId);
      
      setComments(fetchedComments);
      setLocalComments(fetchedComments);

      setNewComment('');
      setSelectedStars(0);
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
          {localComments.length > 0 ? (
            localComments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <div className={styles.commentAuthor}>
                  <strong>{comment.profile ? comment.profile.username : "Anonymous"}</strong>
                </div>
                <p className={styles.commentContent}>{comment.text}</p>
                <div className={styles.commentRating}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <img
                      key={index}
                      src="/img/star.webp"
                      alt={`star-${index + 1}`}
                      className={styles.star}
                      style={{
                        cursor: 'pointer',
                        opacity: comment.rating > index ? 1 : 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      )}

      <div className={styles.commentInput}>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          className={styles.textarea}
        />
        <div className={styles.ratingSection}>
          {Array.from({ length: 5 }, (_, index) => (
            <img
              key={index}
              src="/img/star.webp"
              alt={`star-${index + 1}`}
              className={styles.star}
              style={{
                cursor: 'pointer',
                opacity: selectedStars > index ? 1 : 0.3,
              }}
              onClick={() => handleRatingClick(index + 1)}
            />
          ))}
        </div>
        <button onClick={handleSubmitComment} className={styles.submitButton}>Post Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;
