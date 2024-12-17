import React, { useState } from "react";
import styles from "@/styles/addpost/addpost.module.css";
import selectImageButtonStyles from "@/styles/buttons/selectImageButton.module.css";
import Layout from "@/components/Layoutwrapper";
import { PostData } from "@/types"; // Import the PostData type
import PostService from "@/services/PostService";
import UserService from "@/services/UserService";

const AddPost: React.FC = () => {
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
    
            await PostService.createPost(postData);
    
            setSuccessMessage("Post created successfully!");
            setDescription("");
            setImages(null);
        } catch (err) {
            console.error("Error creating post:", err);
            setError("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };    

    const imageUrls = images ? Array.from(images).map((file) => URL.createObjectURL(file)) : [];
    const imageNames = images ? Array.from(images).map((file) => file.name) : [];

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Create a New Post</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Enter the post description"
                            rows={5}
                            className={styles.textarea}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="images">Select Images</label>
                        <label
                            htmlFor="images"
                            className={selectImageButtonStyles.selectImageButton}
                        >
                            Choose Images
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

                    {/* Display the image previews with their clickable names */}
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
                        {loading ? "Submitting..." : "Submit Post"}
                    </button>

                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </form>
            </div>
        </Layout>
    );
};

export default AddPost;
