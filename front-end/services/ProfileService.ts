
interface Profile {
    username: string;
    bio: string;
    role: string;
  }

const createProfile = async (profile: Profile, email: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/profiles/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile: profile,
        email: email,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Error creating profile');
    }
    
    return response.json();
  };

  const ProfileService = {
    createProfile,
  };

  export default ProfileService;