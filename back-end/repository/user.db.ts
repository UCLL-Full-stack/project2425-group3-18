import { User } from '../model/user';

const users: User[] = [];

const getAllUsers = (): User[] => {
    return users;
};

export default {
    getAllUsers,
};
