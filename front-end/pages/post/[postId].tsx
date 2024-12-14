import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CommentSection from "../../components/CommentSection";
import ShareModal from "../../components/SharePopup";
import styles from "@/styles/postDetail/postDetail.module.css";

const PostDetail: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;

  const postIdAsNumber = Number(postId);

  const [post, setPost] = useState<any | null>(null);
  const [comments, setComments] = useState<{ [key: number]: { text: string; rating: number }[] }>({});
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    console.log("PostId:", postId);  // Log the postId to check if it is coming from the URL

    if (postIdAsNumber) {
      // Simulate fetching a post (this can be replaced with real API fetching logic)
      const fetchedPost = {
        postId: postIdAsNumber,
        title: "Social Media Post",
        images: ["/img/posts/kot1.jpg"],
        description: "A detailed description of the post content goes here. A few lines of text to explain the image."
      };
      console.log("Fetched Post:", fetchedPost);  // Log the fetched post details
      setPost(fetchedPost);

      // Load comments from sessionStorage if available
      const storedComments = sessionStorage.getItem(`comments-${postIdAsNumber}`);
      console.log("Stored comments:", storedComments);  // Log the retrieved comments from sessionStorage
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }
    }
  }, [postIdAsNumber]);

  const handleAddComment = (postId: number, newComment: { text: string; rating: number }) => {
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      if (updatedComments[postId]) {
        updatedComments[postId].push(newComment);
      } else {
        updatedComments[postId] = [newComment];
      }

      // Log the updated comments before saving to sessionStorage
      console.log("Saving comments to sessionStorage:", updatedComments);

      // Save the updated comments to sessionStorage
      sessionStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));

      return updatedComments;
    });
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
    console.log("Comments visibility toggled:", !showComments);  // Log the comment visibility state
  };

  const handleShareClick = () => {
    setShowModal(true);
    console.log("Share modal opened.");  // Log when the share modal is opened
  };

  const closeModal = () => {
    setShowModal(false);
    console.log("Share modal closed.");  // Log when the share modal is closed
  };

  // Calculate average rating
  const calculateAverageRating = (comments: { text: string; rating: number }[]) => {
    if (!comments.length) return 0; // Ensure no division by zero
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return totalRating / comments.length;
  };

  // Get the comments for the current postId
  const currentPostComments = comments[postIdAsNumber] || [];
  console.log("Current Post Comments:", currentPostComments);  // Log the current post's comments
  const averageRating = calculateAverageRating(currentPostComments);

  return (
    <div className={styles.detailView}>
      {post && (
        <div className={styles.postDetail_mainContent__N4m_W}>
          <div className={styles.leftPanel}>
            <div className={styles.imageContainer}>
              <img src={post.images[0]} alt={post.title} className={styles.detailImage} />
            </div>
            <div className={styles.imageDescription}>
              <h1 className={styles.title}>{post.title}</h1>
              <div className={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="/img/star.webp"
                    alt={`Star ${i + 1}`}
                    className={i < Math.round(averageRating) ? styles.filledStar : styles.emptyStar}
                  />
                ))}
              </div>
              <p className={styles.description}>{post.description}</p>
            </div>

            <div className={styles.iconContainer}>
              <button className={styles.iconButton} onClick={toggleComments}>
                <img src="/img/comment.png" alt="Comment" className={styles.icon} />
              </button>
              <button className={styles.iconButton} onClick={handleShareClick}>
                <img src="/img/share.webp" alt="Share" className={styles.icon} />
              </button>
            </div>
          </div>

          {showComments && (
            <div className={styles.rightPanel}>
              <CommentSection
                postId={post.postId}
                onAddComment={handleAddComment}
                comments={currentPostComments}
              />
            </div>
          )}
        </div>
      )}

      {showModal && (
        <ShareModal
          postTitle={post.title}
          postUrl={window.location.href}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default PostDetail;
