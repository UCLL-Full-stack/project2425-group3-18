import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import userService from '../../service/user.service';

const mockUsersDb = [
    new User({
        userName: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123',
    }),
];

// Setup Mocks
beforeEach(() => {
    jest.spyOn(userDb, 'getAllUsers').mockReturnValue(mockUsersDb);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: Users exist in database; when: getAllUsers is called; then: all Users are returned;', () => {
    // Act
    const result = userService.getAllUsers();

    // Assert
    expect(userDb.getAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsersDb);
});