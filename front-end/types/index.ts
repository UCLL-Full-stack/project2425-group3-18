export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    profile: {
      username: string;
      bio: string;
      role: string;
    };
}
export interface Profile {
  username: string;
  bio: string;
  role: string;
}

export interface PostData {
  description: string;
  image: string;
  profile: {
    username: string;
    bio: string;
    role: string;
  };
}

export interface CreatePostResponse {
  message: string;
  post: PostData;
}