import { User } from '../model/user';
import database from './prisma/database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                profile: true,
            },
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        throw new Error('Database error, see server log for more information.');
    }
};

export default {
    getAllUsers,
};
