import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CommentSection from "../../components/CommentSection";
import ShareModal from "../../components/SharePopup";
import styles from "@/styles/postDetail/postDetail.module.css";
import Layout from "@/components/Layoutwrapper";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useSWR from "swr";
import Head from "next/head";
import { PostService } from "@/services/PostService";

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
    () => PostService.getPostById(postIdAsNumber!)
  );

  const { data: comments, error: commentsError } = useSWR(
    postIdAsNumber ? `/api/comments/${postIdAsNumber}` : null,
    () => fetchComments(postIdAsNumber!)
  );

  const initialShowComments = typeof window !== "undefined" ? sessionStorage.getItem(`showComments-${postIdAsNumber}`) === "true" : false;
  
  const [showComments, setShowComments] = useState<boolean>(initialShowComments);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleAddComment = (postId: number, newComment: { text: string; rating: number }) => {
    const updatedComments = [...(comments || []), newComment];
    sessionStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
    router.reload();
  };

  const toggleComments = () => {
    const newState = !showComments;
    setShowComments(newState);
    sessionStorage.setItem(`showComments-${postIdAsNumber}`, newState ? "true" : "false");
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

  if (!post) {
    return <div>{t("loadingPost")}</div>;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/img/logo2.png" />
        <title>Rate My Kot - {t("postDetailPage.title")}</title>
      </Head>
      <Layout>
        <div className={styles.detailView}>
          {post && (
            <div className={styles.postDetail_mainContent__N4m_W}>
              <div className={styles.leftPanel}>
                <div className={styles.imageContainer}>
                  <img src={post.image} alt={post.description} className={styles.detailImage} />
                </div>
                <div className={styles.imageDescription}>
                  <h1 className={styles.title}>{post.description}</h1>
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

                  <div className={styles.profileDetails}>
                    <p><strong>{t("profilePage.username")}</strong>: {post.profile.username}</p>
                    <p><strong>{t("profilePage.bio")}</strong>: {post.profile.bio}</p>
                    <p><strong>{t("profilePage.role")}</strong>: {post.profile.role}</p>
                  </div>
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
                    postId={postIdAsNumber!}
                    onAddComment={handleAddComment}
                    comments={comments || []}
                  />
                </div>
              )}
            </div>
          )}

          {showModal && (
            <ShareModal
              postTitle={post.description}
              postUrl={window.location.href}
              onClose={closeModal}
            />
          )}
        </div>
      </Layout>
    </>
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
