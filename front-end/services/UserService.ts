import { User, UserData } from "@/types";

// Get all users
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
    console.log("Fetched users:", users);

    return users;
  } catch (error) {
    throw error;
  }
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

  const userData = await response.json();

  sessionStorage.setItem("loggedInUser", JSON.stringify(userData));

  return userData;
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
