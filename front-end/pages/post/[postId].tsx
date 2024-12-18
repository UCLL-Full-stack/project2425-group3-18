import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CommentSection from "../../components/CommentSection";
import ShareModal from "../../components/SharePopup";
import styles from "@/styles/postDetail/postDetail.module.css";
import Layout from "@/components/Layoutwrapper";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useSWR from "swr";

const fetchPost = (postId: number) =>
  fetch(`/api/posts/${postId}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching post data", error);
      return null;
    });

const fetchComments = (postId: number) =>
  sessionStorage.getItem(`comments-${postId}`)
    ? JSON.parse(sessionStorage.getItem(`comments-${postId}`)!)
    : [];

const PostDetail: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { postId } = router.query;

  const postIdAsNumber = postId ? Number(postId) : null;

  const { data: post, error: postError } = useSWR(
    postIdAsNumber ? `/api/posts/${postIdAsNumber}` : null,
    () => fetchPost(postIdAsNumber!)
  );

  const { data: comments, error: commentsError } = useSWR(
    postIdAsNumber ? `/api/comments/${postIdAsNumber}` : null,
    () => fetchComments(postIdAsNumber!)
  );

  const [showComments, setShowComments] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleAddComment = (postId: number, newComment: { text: string; rating: number }) => {
    const updatedComments = [...(comments || []), newComment];
    sessionStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleShareClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const calculateAverageRating = (comments: { text: string; rating: number }[]) => {
    if (!comments.length) return 0;
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return totalRating / comments.length;
  };

  const averageRating = calculateAverageRating(comments || []);

  if (postError || commentsError) {
    return <div>{t("errorFetchingData")}</div>;
  }

  return (
    <Layout>
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
                  comments={comments || []}
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
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default PostDetail;
