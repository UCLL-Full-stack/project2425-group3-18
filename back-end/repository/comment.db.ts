import { Comment } from '../model/comment';
import database from './prisma/database';

const getAllComments = async (): Promise<Comment[]> => {
    try {
        const commentsPrisma = await database.comment.findMany({
            include: {
                profile: true,
                post: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        return commentsPrisma.map((commentPrisma) => Comment.from(commentPrisma));
    } catch (error) {
        throw new Error('Database error getting comments.');
    }
};

const createComment = async (comment: Comment): Promise<Comment> => {
    try {
        const commentPrisma = await database.comment.create({
            data: {
                text: comment.getText(),
                rating: comment.getRating(),
                profile: {
                    connect: { id: comment.getProfile()?.getId() },
                },
                post: {
                    connect: { id: comment.getPost().getId() },
                },
            },
            include: { profile: true, post: { include: { profile: true } } },
        });
        return Comment.from(commentPrisma);
    } catch (error) {
        throw new Error('Database error creating comment.');
    }
};

const getAllCommentsByProfile = async ({ id }: { id: number }): Promise<Comment[]> => {
    try {
        const commentsPrisma = await database.comment.findMany({
            where: { profileId: id },
            include: {
                profile: true,
                post: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        return commentsPrisma.map((commentPrisma) => Comment.from(commentPrisma));
    } catch (error) {
        throw new Error('Database error finding all comments by profile');
    }
};

const deleteAllProfileComments = async (username: string): Promise<number> => {
    try {
        const { count } = await database.comment.deleteMany({
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

const getAllPostComments = async (postId: number): Promise<Comment[]> => {
    try {
        const commentsPrisma = await database.comment.findMany({
            where: {
                postId,
            },
            include: {
                profile: true,
                post: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        return commentsPrisma.map((commentPrisma) => Comment.from(commentPrisma));
    } catch (error) {
        throw new Error('Database error finding all comments related to a post.');
    }
};

export default {
    getAllComments,
    createComment,
    getAllCommentsByProfile,
    deleteAllProfileComments,
    getAllPostComments,
};
