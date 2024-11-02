type CommentInput = {
    id?: number;
    text: string;
    postId: number;
};

type PostInput = {
    id?: number;
    description: string;
    image: string;
    comments?: CommentInput[];
};

type KotInput = {
    id?: number;
    location: string;
    price: number;
    surfaceSpace: number;
    profiles?: number[];
};

type ProfileInput = {
    id?: number;
    firstName: string;
    lastName: string;
    bio: string;
    role: string;
    userId: number;
    posts?: PostInput[];
    koten?: KotInput[];
};

type UserInput = {
    id?: number;
    userName: string;
    email: string;
    password: string;
    profile?: ProfileInput;
};

export {
    CommentInput,
    PostInput,
    KotInput,
    ProfileInput,
    UserInput,
};
