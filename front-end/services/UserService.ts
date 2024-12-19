import { Profile, User, UserData } from "@/types";

const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    const token = loggedInUser.token;
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching users:", errorData);
      throw new Error(errorData.message || "Failed to fetch users");
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error in getAllUsers function:", error);
    throw error;
  }
};

const loginUser = async (user: User) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const userData = await response.json();

  sessionStorage.setItem("loggedInUser", JSON.stringify(userData));

  return userData;
};

const registerUserWithProfile = async (
  user: User,
  profile: Profile
) => {
  try {
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      throw new Error(errorData.message || "User registration failed");
    }

    const createdUser = await userResponse.json();

    const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profile, email: user.email }), // Use the user's email for association
    });

    if (!profileResponse.ok) {
      const errorData = await profileResponse.json();
      throw new Error(errorData.message || "Profile creation failed");
    }

    const createdProfile = await profileResponse.json();

    return { user: createdUser, profile: createdProfile };
  } catch (error) {
    console.error("Error registering user and creating profile:", error);
    throw error;
  }
};

const deleteUserByEmail = async (email: string) => {
  try {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    const token = loggedInUser.token;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error deleting user:", errorData);
      throw new Error(errorData.message || "User deletion failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in deleteUserByEmail function:", error);
    throw error;
  }
};

export const UserService = {
  loginUser,
  registerUserWithProfile,
  getAllUsers,
  deleteUserByEmail,
};

