import { Profile } from "@/types";

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

// const createProfile = async (profileData: { username: string; bio: string; role: string; email: string }) => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/create`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ profile: profileData, email: profileData.email }),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error creating profile:", errorData.message);
//         throw new Error(errorData.message || "Profile creation failed");
//       }
  
//       return response.json();
//     } catch (error) {
//       throw error;
//     }
//   };

  const deleteProfileByUsername = async (username: string) => {
    const loggedInUserString = sessionStorage.getItem("loggedInUser");
  
    if (!loggedInUserString) {
      throw new Error("Logged-in user data is missing in sessionStorage.");
    }
  
    const loggedInUser = JSON.parse(loggedInUserString);
    const token = loggedInUser?.token;
  
    if (!token) {
      throw new Error("No auth token found");
    }
  
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profiles/${username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error(`Failed to delete profile: ${response.statusText}`);
    }
  
    return await response.json();
  };

  const updateModeratorToUser = async (username: string): Promise<Profile> => {
    try {
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
      const token = loggedInUser.token;
  
      if (!token) {
        throw new Error("No authentication token found");
      }
  
      const updatedProfile = {
        username,
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/user/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating user:", errorData);
        throw new Error(errorData.message || "Failed to update user");
      }
  
      const updatedUserProfile: Profile = await response.json();
      return updatedUserProfile;
    } catch (error) {
      console.error("Error in updateUser function:", error);
      throw error;
    }
  };

  const updateUserToModerator = async (username: string): Promise<Profile> => {
    try {
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
      const token = loggedInUser.token;
  
      if (!token) {
        throw new Error("No authentication token found");
      }
  
      const updatedProfile = {
        username,
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/moderator/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating user to moderator:", errorData);
        throw new Error(errorData.message || "Failed to update user to moderator");
      }
  
      const updatedUserProfile: Profile = await response.json();
      return updatedUserProfile;
    } catch (error) {
      console.error("Error in updateUserToModerator function:", error);
      throw error;
    }
  };  

  export const ProfileService = {
    getProfileByUsername,
    //createProfile,
    deleteProfileByUsername,
    updateModeratorToUser,
    updateUserToModerator
};
