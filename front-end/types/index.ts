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
  id?: number;
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

export interface ContentGridProps {
  username?: string;
  filterByUsername?: boolean;
}
export interface KotData {
  city: string;
  street: string;
  housenumber: string;
  price: string;
  surfaceSpace: string;
}

export interface DeletePostButtonProps {
  postId: number;
  onDelete: () => void;
}

export interface Post {
  id: number;
  description: string;
  image: string;
  profile: Profile;
}

export interface Comment {
  id: number;
  text: string;
  profile: {
    username: string;
    bio: string;
    role: string;
  };
}

export interface CommentRequestBody {
  commentCreate: {
    text: string;
    username: string;
  },
  postId: number;
};

export interface ContentGridProps {
  searchQuery?: string;
}
