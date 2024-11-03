import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';

const getAllUsers = (): User[] => {
    return userDb.getAllUsers();
};

const createUser = (userInput: UserInput): User => {
    try {
        const existingUser = userDb.getUserByEmail(userInput.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
    } catch (error) {
        if (error instanceof Error && error.message !== 'user not found') {
            throw error;
        }
    }

    const newUser = new User({
        userName: userInput.userName,
        email: userInput.email,
        password: userInput.password,
    });
    return userDb.createUser(newUser);
};

export default {
    getAllUsers,
    createUser,
};
