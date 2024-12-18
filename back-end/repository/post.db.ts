import { Post } from '../model/post';
import database from './prisma/database';

const getAllPosts = async (): Promise<Post[]> => {
    try {
        const postsPrisma = await database.post.findMany({
            include: {
                comments: true,
                profile: true,
            },
        });
        return postsPrisma.map((postPrisma) => Post.from(postPrisma));
    } catch (error) {
        throw new Error('Database error trying to find all posts.');
    }
};

const getPostById = async ({ id }: { id: number }): Promise<Post | null> => {
    try {
        const postPrisma = await database.post.findUnique({
            where: { id },
            include: { profile: true },
        });
        return postPrisma ? Post.from(postPrisma) : null;
    } catch (error) {
        throw new Error('Database error finding post by id.');
    }
};

const getAllPostsByProfile = async ({ id }: { id: number }): Promise<Post[]> => {
    try {
        const postsPrisma = await database.post.findMany({
            where: { profileId: id },
            include: { profile: true },
        });
        return postsPrisma.map((postPrisma) => Post.from(postPrisma));
    } catch (error) {
        throw new Error('Database error finding all posts by profile');
    }
};

const createPost = async (post: Post): Promise<Post> => {
    try {
        const postPrisma = await database.post.create({
            data: {
                description: post.getDescription(),
                image: post.getImage(),
                profile: {
                    connect: { id: post.getProfile()?.getId() },
                },
            },
            include: { profile: true },
        });
        return Post.from(postPrisma);
    } catch (error) {
        throw new Error('Database error creating post.');
    }
};

const deletePost = async (postId: number): Promise<Post> => {
    try {
        const deletePost = await database.post.delete({
            where: {
                id: postId,
            },
            include: {
                profile: true,
            },
        });
        return Post.from(deletePost);
    } catch (error) {
        throw new Error('Database error deleting post');
    }
};

const deleteAllProfilePosts = async (username: string): Promise<number> => {
    try {
        const { count } = await database.post.deleteMany({
            where: {
                profile: {
                    username,
                },
            },
        });
        return count;
    } catch (error) {
        throw new Error('Database error deleting posts');
    }
};

export default {
    getAllPosts,
    createPost,
    getPostById,
    getAllPostsByProfile,
    deletePost,
    deleteAllProfilePosts,
};
