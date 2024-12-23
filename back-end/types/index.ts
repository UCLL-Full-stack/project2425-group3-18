enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}

type CommentInput = {
    text: string;
    rating: number;
    post: PostInput;
    profile: ProfileInput;
};

type CommentCreate = {
    text: string;
    rating: number;
    username: string;
};

type PostInput = {
    description: string;
    image: string;
    profile: ProfileInput;
};

type PostId = {
    postId: number;
};

type KotInput = {
    location: LocationInput;
    price: number;
    surfaceSpace: number;
    profiles?: ProfileInput[];
};

type KotCreationInput = {
    location: LocationInput;
    price: number;
    surfaceSpace: number;
    username: string;
};

type ProfileInput = {
    username: string;
    bio: string;
    role: role;
};

type UserInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profile?: ProfileInput;
};

type AuthInput = {
    email: string;
    password: string;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    fullName: string;
    username?: string;
    role?: string;
};

type LocationInput = {
    city: string;
    street: string;
    housenumber: number;
};

export {
    CommentInput,
    PostInput,
    KotInput,
    ProfileInput,
    UserInput,
    AuthInput,
    AuthenticationResponse,
    PostId,
    CommentCreate,
    KotCreationInput,
};
