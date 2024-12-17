import { User } from "@/types";

// Get all users
const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch users");
  }

  return response.json();
};

// Login user
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

  return response.json();
};

// Register user
const registerUser = async (user: User) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "User registration failed");
  }

  return response.json();
};

// Create Profile
const createProfile = async (profileData: { username: string; bio: string; role: string; email: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profile: profileData, email: profileData.email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Profile creation failed");
  }

  return response.json();
};

const UserService = {
  getAllUsers,
  loginUser,
  registerUser,
  createProfile,
};

export default UserService;
