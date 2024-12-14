import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';

const getAllUsers = (): Promise<User[]> => {
    return userDb.getAllUsers();
};
export default {
    getAllUsers,
};
