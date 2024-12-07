enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}

type CommentInput = {
    text: string;
    post: PostInput;
    profile: ProfileInput;
};

type PostInput = {
    description: string;
    image: string;
    comments?: CommentInput[];
};

type KotInput = {
    location: LocationInput;
    price: number;
    surfaceSpace: number;
    profiles?: ProfileInput[];
};

type ProfileInput = {
    firstName: string;
    lastName: string;
    bio: string;
    role: role;
    posts: PostInput[];
    koten: KotInput[];
};

type UserInput = {
    username: string;
    email: string;
    password: string;
    profile?: ProfileInput;
};

type LocationInput = {
    city: string;
    street: string;
    housenumber: number;
    kot: KotInput;
}

export {
    CommentInput,
    PostInput,
    KotInput,
    ProfileInput,
    UserInput,
};
