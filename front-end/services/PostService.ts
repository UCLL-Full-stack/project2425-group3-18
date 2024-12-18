import { CreatePostResponse, PostData } from "@/types";

const createPost = async (postData: PostData): Promise<CreatePostResponse> => {
  try {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    const token = loggedInUser.token;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ post: postData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating post:", errorData);
      throw new Error(errorData.message || "Failed to create post");
    }

    const result: CreatePostResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error in createPost function:", error);
    throw error;
  }
};

const getAllPosts = async (): Promise<PostData[]> => {
  try {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    const token = loggedInUser.token;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching posts:", errorData);
      throw new Error(errorData.message || "Failed to retrieve posts");
    }

    const posts: PostData[] = await response.json();
    return posts;
  } catch (error) {
    console.error("Error in getAllPosts function:", error);
    throw error;
  }
};

const getPostsByUsername = async (username: string): Promise<PostData[]> => {
  try {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    const token = loggedInUser.token;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching posts by username:", errorData);
      throw new Error(errorData.message || "Failed to retrieve posts by username");
    }

    const posts: PostData[] = await response.json();
    return posts;
  } catch (error) {
    console.error("Error in getPostsByUsername function:", error);
    throw error;
  }
};

const deletePost = async (id: number) => {
  try {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    const token = loggedInUser.token;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error deleting post:", errorData);
      throw new Error(errorData.message || "Failed to delete post");
    }

    const result = await response.json();
    console.log("Post deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error in deletePost function:", error);
    throw error;
  }
};

const PostService = {
  createPost,
  getAllPosts,
  getPostsByUsername,
  deletePost,
};

export default PostService;
