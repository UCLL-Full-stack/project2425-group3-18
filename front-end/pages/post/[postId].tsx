import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PostService } from '@/services/PostService';
import { PostData } from '@/types'; 
import styles from '@/styles/postDetail/postDetail.module.css';
import ShareModal from '@/components/popups/SharePopup';
import Layout from '@/components/layout/Layoutwrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import CommentSection from '@/components/comment/CommentSection';
import { CommentService } from '@/services/CommentService';

const PostDetail = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (postId) {
      const fetchPostDetail = async () => {
        setLoading(true);
        try {
          const fetchedPost = await PostService.getPostById(Number(postId));
          setPost(fetchedPost);

          const fetchedComments = await CommentService.getCommentsByPostId(Number(postId));
          setComments(fetchedComments);

          setLoading(false);
        } catch (err) {
          setError("Failed to fetch post details.");
          setLoading(false);
        }
      };
      fetchPostDetail();
    }
  }, [postId]);

  const handleCommentClick = () => {
    setIsCommentSectionOpen(!isCommentSectionOpen);
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  const calculateAverageRating = (comments: any[]): number => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return totalRating / comments.length;
  };

  const renderStars = (rating: number) => {
    return (
      <>
        {Array.from({ length: 5 }, (_, index) => {
          const opacity = rating > index ? 1 : 0.3;
          return (
            <img
              key={index}
              src="/img/star.webp"
              alt={`star-${index + 1}`}
              className={styles.star}
              style={{ opacity }}
            />
          );
        })}
      </>
    );
  };

  const averageRating = calculateAverageRating(comments);

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <Layout>
      <div className={styles.postDetail}>
        <div className={styles.imageContainer}>
          <img src={post?.image || ""} alt={post?.description} />
        </div>
        <h1>{post?.profile.username}</h1>
        <div className={styles.profile}>
          <p><strong>{post?.description}</strong></p>
        </div>

        <div className={styles.averageRating}>
          <div className={styles.ratingStars}>
            {renderStars(averageRating)}
          </div>
        </div>

        <div className={styles.buttons}>
          <button onClick={handleCommentClick} className={styles.button}>
            <img src="/img/comment.png" alt="Comment" />
          </button>
          <button onClick={handleShareClick} className={styles.button}>
            <img src="/img/share.webp" alt="Share" />
          </button>
        </div>

        {isShareModalOpen && (
          <ShareModal
            postTitle={post?.description || ""}
            postUrl={window.location.href}
            onClose={handleCloseShareModal}
          />
        )}

        {isCommentSectionOpen && <CommentSection postId={Number(postId)} setComments={setComments} />}
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
