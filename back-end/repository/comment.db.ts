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

export default {
    getAllComments,
    createComment,
};
