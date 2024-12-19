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
  rating: number;
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
    rating: number;
  };
  postId: number;
};

export interface ContentGridProps {
  searchQuery?: string;
}

export interface Location {
  id?: number;
  city: string;
  street: string;
  housenumber: number;
}

export interface Kot {
  id: number;
  location: Location;
  price: number;
  surfaceSpace: number;
  profiles: Profile[];
}

export interface KotData {
  location: Location;
  price: number;
  surfaceSpace: number;
}

export interface PostCardProps {
  post: any;
  username: string | undefined;
  onClick: (postId: number) => void;
}