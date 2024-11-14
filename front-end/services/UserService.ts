// Get Users Request
const getAllUsers = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
};

// Post User + Profile Request
const createUser = async (userData: { 
  user: { 
    userName: string; 
    email: string; 
    password: string; 
  }; 
  profile: { 
    firstName: string; 
    lastName: string; 
    bio: string; 
    role: string; 
    posts: any[]; 
    koten: any[]; 
  } 
}) => {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error: ${response.status} - ${errorMessage}`);
  }

  return await response.json();
};

  
const UserService = {
  getAllUsers,
  createUser,
};
  
export default UserService;
  