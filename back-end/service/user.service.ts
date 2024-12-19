import { User } from '../model/user';
import userDb from '../repository/user.db';
import { AuthInput, AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
import profileService from './profile.service';

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
    const existingUser = await userDb.getUserByEmail({ email });
    if (existingUser) {
        throw new Error(`User with email ${email} already exists.`);
    }
    const hashedPassword = await bcrypt.hash(password, 15);
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    return await userDb.createUser(user);
};

const authenticate = async (a: AuthInput): Promise<AuthenticationResponse> => {
    const email = a.email;
    const password = a.password;
    const user = await getUserByEmail(email);
    const role = user.getProfile()?.getRole();

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('The given password is invalid.');
    }

    if (!role) {
        throw new Error("Can't login if user doesn't have a profile");
    }

    return {
        token: generateJwtToken({ email }, { role }),
        email: email,
        fullName: `${user.getFirstName()} ${user.getLastName()}`,
        username: user.getProfile()?.getUsername(),
        role: user.getProfile()?.getRole(),
    };
};

const deleteUser = async (email: string): Promise<User> => {
    const user = getUserByEmail(email);
    if ((await user).getProfile()) {
        throw new Error('Please first delete the profile before deleting the user');
    }
    return userDb.deleteUser({ email });
};

export default {
    getAllUsers,
    createNewUser,
    getUserByEmail,
    authenticate,
    deleteUser,
};
