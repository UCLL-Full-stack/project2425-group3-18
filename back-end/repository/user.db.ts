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
        throw new Error('Database error trying to find all users.');
    }
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { email },
            include: {profile: true}
        });
        return userPrisma ? User.from(userPrisma) : null
    } catch (error) {
        throw new Error('Database error trying to find user by email.')
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                email: user.getEmail(),
                password: user.getPassword(),
            },
            include: { profile: true },
        });
        return User.from(userPrisma);
    } catch (error) {
        throw new Error('Database error creating user.');
    }
};

export default {
    getAllUsers,
    getUserByEmail,
    createUser,
};
