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
        throw new Error('Database error, see server log for more information.');
    }
};

export default {
    getAllPosts,
};
