import { User } from '../model/user';
import userDb from '../repository/user.db';
import { AuthInput, AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

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

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('The given password is invalid.');
    }

    return {
        token: generateJwtToken({ email }),
        email: email,
        fullName: `${user.getFirstName()} ${user.getLastName()}`,
        username: user.getProfile()?.getUsername(),
        role: user.getProfile()?.getRole(),
    };
};

export default {
    getAllUsers,
    createNewUser,
    getUserByEmail,
    authenticate,
};
