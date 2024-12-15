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
                    }
                },
            }
        });
        return commentsPrisma.map((commentPrisma) => Comment.from(commentPrisma));
    } catch (error) {
        throw new Error('Database error, see server log for more information.');
    }
};

export default {
    getAllComments,
};
