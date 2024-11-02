import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = (): User[] => {
    return userDb.getAllUsers();
};

export default {
    getAllUsers,
};
