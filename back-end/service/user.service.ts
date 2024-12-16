import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';
import bcrypt from 'bcrypt';

const getAllUsers = (): Promise<User[]> => {
    return userDb.getAllUsers();
};

const getUserByEmail = async (email: string): Promise<User> => {
    const user = await userDb.getUserByEmail({ email });
    if (!user) {
        throw new Error(`User with ${email} does not exist.`);
    }
    return user;
};

const createNewUser = async ({
    firstName,
    lastName,
    email,
    password,
}: UserInput): Promise<User> => {
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        throw new Error(`User with email ${email} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, 15);
    const user = new User({ firstName, lastName, email, password: hashedPassword });

    return await userDb.createUser(user);
};

export default {
    getAllUsers,
    createNewUser,
    getUserByEmail
};
