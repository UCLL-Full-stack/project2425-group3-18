import { Comment, CommentRequestBody } from '@/types/index';

const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  try {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    const token = loggedInUser.token;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/post/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching comments by postId:", errorData);
      throw new Error(errorData.message || "Failed to retrieve comments");
    }

    const comments: Comment[] = await response.json();
    return comments;
  } catch (error) {
    console.error("Error in getCommentsByPostId function:", error);
    throw error;
  }
};

export const createComment = async (comment: CommentRequestBody): Promise<Comment> => {
  try {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    const token = loggedInUser.token;

    if (!token) {
      throw new Error("No authentication token found");
    }

    console.log("Request body:", JSON.stringify(comment));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating comment:", errorData);
      throw new Error(errorData.errorMessage || "Failed to create comment");
    }

    const newComment: Comment = await response.json();
    return newComment;
  } catch (error) {
    console.error("Error in createComment function:", error);
    throw new Error("Failed to create comment");
  }
};

export const CommentService = {
  getCommentsByPostId,
  createComment,
};