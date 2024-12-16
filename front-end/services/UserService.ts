// Get Users Request
interface ProfileData {
  username: string;
  bio: string;
  role: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile: ProfileData; // Update profile type
}

const getAllUsers = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createUser = async (userData: UserData) => {
  try {
    console.log("Sending user data to API:", userData); // Log the data being sent

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userData }),
    });

    console.log("Response status:", response.status); // Log response status

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error response body:", errorMessage); // Log the error message from the server
      throw new Error(`Error: ${response.status} - ${errorMessage}`);
    }

    const data = await response.json();
    console.log('User created successfully:', data); // Log success response
    return data;

  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


const UserService = {
  getAllUsers,
  createUser,
};

export default UserService;
