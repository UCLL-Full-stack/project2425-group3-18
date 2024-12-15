import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';
import bcrypt from 'bcrypt';

const getAllUsers = (): Promise<User[]> => {
    return userDb.getAllUsers();
};

const createNewUser = async ({
    firstName,
    lastName,
    email,
    password,
}: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByEmail({ email });

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
};
