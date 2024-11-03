import { User } from '../model/user';

const users: User[] = [];

const getAllUsers = (): User[] => {
    return users;
};

const getUserByEmail = (email: string): User => {
    const user = users.find((user) => user.getEmail() === email);
    if (!user) {
        throw new Error('user not found');
    }
    return user;
};

const createUser = (userData: User): User => {
    const newUser = new User({
        userName: userData.getUserName(),
        email: userData.getEmail(),
        password: userData.getPassword(),
    });
    users.push(newUser);
    return newUser;
};

const defaultUser = new User({
    userName: 'testUser',
    email: 'test@example.com',
    password: 'password123',
});
createUser(defaultUser);

export default {
    getAllUsers,
    getUserByEmail,
    createUser,
};
