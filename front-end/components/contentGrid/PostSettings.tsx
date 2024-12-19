import React, { useRef, useState } from "react";
import styles from "@/styles/contentGrid/contentGrid.module.css";
import DeletePostButton from "../buttons/deletePostButton";

interface PostSettingsProps {
  postId: number;
}

const PostSettings: React.FC<PostSettingsProps> = ({ postId }) => {
  const [deleteButtonVisible, setDeleteButtonVisible] = useState<boolean>(false);
  const settingsButtonRef = useRef<HTMLButtonElement | null>(null);
  const deleteButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleDeleteButtonToggle = () => {
    setDeleteButtonVisible((prev) => !prev);
  };

  const handleDeletePost = () => {
    console.log(`Post with ID ${postId} deleted.`);
    setDeleteButtonVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      settingsButtonRef.current &&
      !settingsButtonRef.current.contains(event.target as Node) &&
      deleteButtonRef.current &&
      !deleteButtonRef.current.contains(event.target as Node)
    ) {
      setDeleteButtonVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.settingsIconContainer}>
      <button
        className={styles.settingsButton}
        ref={settingsButtonRef}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteButtonToggle();
        }}
      >
        &#8226;&#8226;&#8226;
      </button>

      {deleteButtonVisible && (
        <div className={styles.deleteButtonWrapper}>
          <DeletePostButton postId={postId} onDelete={handleDeletePost} ref={deleteButtonRef} />
        </div>
      )}
    </div>
  );
};

export default PostSettings;
