import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CommentSection from '../../components/CommentSection';
import styles from "@/styles/postDetail/postDetail.module.css";

const PostDetail: React.FC = () => {
    const router = useRouter();
    const { postId } = router.query;

    const postIdAsNumber = Number(postId);

    const [post, setPost] = useState<any | null>(null);
    const [comments, setComments] = useState<{ [key: number]: { text: string; rating: number }[] }>({});
    const [showComments, setShowComments] = useState<boolean>(false);

    useEffect(() => {
        if (postIdAsNumber) {
            const fetchedPost = {
                postId: postIdAsNumber,
                title: "Social Media Post",
                images: ["/img/posts/kot1.jpg"],
                description: "A detailed description of the post content goes here. A few lines of text to explain the image."
            };
            setPost(fetchedPost);
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
            return updatedComments;
        });
    };

    const handleLike = (postId: number) => {
        console.log(`Liked post ${postId}`);
    };

    const toggleComments = () => {
        setShowComments((prev) => !prev);
    };

    const calculateAverageRating = () => {
        const postComments = comments[postIdAsNumber] || [];
        const totalRatings = postComments.reduce((sum, comment) => sum + comment.rating, 0);
        const averageRating = totalRatings / postComments.length;
        return Math.ceil(averageRating);
    };

    const renderStarRating = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <img
                    key={i}
                    src="/img/star.webp"
                    alt={`Star ${i + 1}`}
                    className={i < rating ? styles.filledStar : styles.emptyStar}
                />
            );
        }
        return stars;
    };

    return (
        <div className={styles.detailView}>
            {post && (
                <div className={styles.postDetail_mainContent__N4m_W}>
                    <div
                        className={`${styles.leftPanel} ${showComments ? styles.shifted : ''}`}
                    >
                        <div className={styles.imageContainer}>
                            <img src={post.images[0]} alt={post.title} className={styles.detailImage} />
                        </div>
                        <div className={styles.imageDescription}>
                            <h1 className={styles.title}>
                                {post.title}
                                {comments[postIdAsNumber] && comments[postIdAsNumber].length > 0 && (
                                    <span className={styles.averageRating}>
                                        {renderStarRating(calculateAverageRating())}
                                    </span>
                                )}
                            </h1>
                            <p className={styles.description}>{post.description}</p>
                        </div>
                        <div className={styles.iconContainer}>
                            <button className={styles.iconButton} onClick={() => handleLike(post.postId)}>
                                <img src="/img/like.png" alt="Like" className={styles.icon} />
                            </button>
                            <button className={styles.iconButton} onClick={toggleComments}>
                                <img src="/img/comment.png" alt="Comment" className={styles.icon} />
                            </button>
                            <button className={styles.iconButton}>
                                <img src="/img/share.webp" alt="Share" className={styles.icon} />
                            </button>
                        </div>
                    </div>

                    {showComments && (
                        <div className={styles.rightPanel}>
                            <CommentSection
                                postId={post.postId}
                                onAddComment={handleAddComment}
                                comments={comments[post.postId] || []}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostDetail;
