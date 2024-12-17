import { User, UserData } from "@/types";

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

const getProfileByUsername = async (username: string) => {
  const loggedInUserString = sessionStorage.getItem("loggedInUser");

  if (!loggedInUserString) {
    throw new Error("Logged-in user data is missing in sessionStorage.");
  }

  const loggedInUser = JSON.parse(loggedInUserString);

  const token = loggedInUser?.token;
  console.log(token);

  if (!token) {
    throw new Error("No auth token found");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profiles/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }

  return await response.json();
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
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profile: profileData, email: profileData.email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating profile:", errorData.message);
      throw new Error(errorData.message || "Profile creation failed");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

const UserService = {
  getProfileByUsername,
  loginUser,
  registerUser,
  createProfile,
  getAllUsers,
};

export default UserService;
