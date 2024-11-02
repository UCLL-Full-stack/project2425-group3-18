import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';

const getAllUsers = (): User[] => {
    return userDb.getAllUsers();
};

const createUser = (userInput: UserInput): User => {
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
