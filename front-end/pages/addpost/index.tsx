import React, { useState } from "react";
import styles from "@/styles/addpost/addpost.module.css";
import selectImageButtonStyles from "@/styles/buttons/selectImageButton.module.css";
import Layout from "@/components/Layoutwrapper";
import { PostData } from "@/types";
import PostService from "@/services/PostService";
import UserService from "@/services/UserService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const AddPost: React.FC = () => {
    const { t } = useTranslation();
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<FileList | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImages(event.target.files);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
    
        try {
            const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    
            if (!loggedInUser || !loggedInUser.username) {
                throw new Error("User is not logged in. Please log in to create a post.");
            }
    
            const profile = await UserService.getProfileByUsername(loggedInUser.username);
    
            const postData: PostData = {
                description,
                image: images && images.length > 0 ? URL.createObjectURL(images[0]) : "", // Use the first image
                profile: {
                    username: profile.username,
                    bio: profile.bio || "No bio available",
                    role: profile.role || "User",
                },
            };

            const createdPost = await PostService.createPost(postData);

            setSuccessMessage(t("addPost.successMessage"));
            setDescription("");
            setImages(null);
        } catch (err) {
            console.error("Error creating post:", err);
            setError(t("addPost.errorMessage"));
        } finally {
            setLoading(false);
        }
    };

    const imageUrls = images ? Array.from(images).map((file) => URL.createObjectURL(file)) : [];
    const imageNames = images ? Array.from(images).map((file) => file.name) : [];

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>{t("addPost.title")}</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="description">{t("addPost.description")}</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder={t("addPost.descriptionPlaceholder")}
                            rows={5}
                            className={styles.textarea}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="images">{t("addPost.selectImages")}</label>
                        <label
                            htmlFor="images"
                            className={selectImageButtonStyles.selectImageButton}
                        >
                            {t("addPost.chooseImages")}
                        </label>
                        <input
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className={selectImageButtonStyles.fileInput}
                        />
                    </div>

                    {images && images.length > 0 && (
                        <div className={styles.imagePreviewContainer}>
                            {imageUrls.map((url, index) => (
                                <div key={index} className={styles.imagePreviewItem}>
                                    <img
                                        src={url}
                                        alt={`Image preview ${index + 1}`}
                                        className={styles.imagePreview}
                                    />
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.imageName}
                                    >
                                        {imageNames[index]}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}

                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? t("addPost.submitting") : t("addPost.submitPost")}
                    </button>

                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </form>
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

export default AddPost;
