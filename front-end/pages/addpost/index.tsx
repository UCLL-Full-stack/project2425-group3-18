import React, { useState } from "react";
import styles from "@/styles/addpost/addpost.module.css";
import selectImageButtonStyles from "@/styles/buttons/selectImageButton.module.css";
import Layout from "@/components/Layoutwrapper";

const AddPost: React.FC = () => {
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<FileList | null>(null);

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImages(event.target.files);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log("Description:", description);
        console.log("Images:", images);
    };

    // Create object URLs for image previews
    const imageUrls = images ? Array.from(images).map(file => URL.createObjectURL(file)) : [];
    const imageNames = images ? Array.from(images).map(file => file.name) : [];

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
                        <label htmlFor="images" className={selectImageButtonStyles.selectImageButton}>
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
                                    {/* Display the image preview */}
                                    <img
                                        src={url}
                                        alt={`Image preview ${index + 1}`}
                                        className={styles.imagePreview}
                                    />
                                    {/* Clickable image name */}
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

                    <button type="submit" className={styles.submitButton}>
                        Submit Post
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AddPost;
