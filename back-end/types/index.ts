type CommentInput = {
    text: string;
    postId: number;
};

type PostInput = {
    description: string;
    image: string;
    comments?: CommentInput[];
};

type KotInput = {
    location: string;
    price: number;
    surfaceSpace: number;
    profiles?: number[];
};

type ProfileInput = {
    firstName: string;
    lastName: string;
    bio: string;
    role: string;
    user: UserInput;
};

type UserInput = {
    userName: string;
    email: string;
    password: string;
};

export {
    CommentInput,
    PostInput,
    KotInput,
    ProfileInput,
    UserInput,
};
