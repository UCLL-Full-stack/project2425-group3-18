import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import bcrypt from 'bcrypt';
import { User } from '../../model/user';
import { AuthenticationResponse, UserInput, AuthInput } from '../../types';

let getAllUsersMock: jest.Mock;
let getUserByEmailMock: jest.Mock;
let createNewUserMock: jest.Mock;
let authenticateMock: jest.Mock;
let deleteUserMock: jest.Mock;
let bcryptHashMock: jest.Mock;
let bcryptCompareMock: jest.Mock;
let generateJwtTokenMock: jest.Mock;

const mockUser = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'hashedpassword',
});

beforeEach(() => {
    getAllUsersMock = jest.fn();
    getUserByEmailMock = jest.fn();
    createNewUserMock = jest.fn();
    authenticateMock = jest.fn();
    deleteUserMock = jest.fn();
    bcryptHashMock = jest.fn();
    bcryptCompareMock = jest.fn();
    generateJwtTokenMock = jest.fn();

    userDb.getAllUsers = getAllUsersMock;
    userDb.getUserByEmail = getUserByEmailMock;
    userDb.createUser = createNewUserMock;
    userDb.deleteUser = deleteUserMock;
    bcrypt.hash = bcryptHashMock;
    bcrypt.compare = bcryptCompareMock;
});

it('should get all users', async () => {
    const mockUsers = [mockUser];

    getAllUsersMock.mockResolvedValue(mockUsers);

    const result = await userService.getAllUsers();

    expect(result).toEqual(mockUsers);
    expect(getAllUsersMock).toHaveBeenCalledTimes(1);
});

it('should get user by email', async () => {
    getUserByEmailMock.mockResolvedValue(mockUser);

    const result = await userService.getUserByEmail('johndoe@example.com');

    expect(result).toEqual(mockUser);
    expect(getUserByEmailMock).toHaveBeenCalledWith({ email: 'johndoe@example.com' });
});

it('should throw an error if user does not exist when getting user by email', async () => {
    getUserByEmailMock.mockResolvedValue(null);

    await expect(userService.getUserByEmail('nonexistent@example.com')).rejects.toThrowError(
        'User with nonexistent@example.com does not exist.'
    );
});

it('should throw an error if user already exists when creating user', async () => {
    const userInput: UserInput = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
    };

    getUserByEmailMock.mockResolvedValue(mockUser);

    await expect(userService.createNewUser(userInput)).rejects.toThrowError(
        `User with email johndoe@example.com already exists.`
    );
});

it('should throw an error if password is invalid when authenticating', async () => {
    const authInput: AuthInput = { email: 'johndoe@example.com', password: 'wrongpassword' };

    getUserByEmailMock.mockResolvedValue(mockUser);
    bcryptCompareMock.mockResolvedValue(false);

    await expect(userService.authenticate(authInput)).rejects.toThrowError('The given password is invalid.');
});

it('should throw an error if user does not have a profile when authenticating', async () => {
    const authInput: AuthInput = { email: 'johndoe@example.com', password: 'password123' };

    getUserByEmailMock.mockResolvedValue(mockUser);
    bcryptCompareMock.mockResolvedValue(true);
    mockUser.getProfile = jest.fn().mockReturnValue(null);

    await expect(userService.authenticate(authInput)).rejects.toThrowError("Can't login if user doesn't have a profile");
});

it('should delete user', async () => {
    getUserByEmailMock.mockResolvedValue(mockUser);
    mockUser.getProfile = jest.fn().mockReturnValue(null);

    deleteUserMock.mockResolvedValue(mockUser);

    const result = await userService.deleteUser('johndoe@example.com');

    expect(result).toEqual(mockUser);
    expect(deleteUserMock).toHaveBeenCalledWith({ email: 'johndoe@example.com' });
});

it('should throw an error if trying to delete user with a profile', async () => {
    const mockUserWithProfile = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'hashedpassword',
    });
    mockUserWithProfile.getProfile = jest.fn().mockReturnValue({});

    getUserByEmailMock.mockResolvedValue(mockUserWithProfile);

    await expect(userService.deleteUser('johndoe@example.com')).rejects.toThrowError(
        'Please first delete the profile before deleting the user'
    );
});
