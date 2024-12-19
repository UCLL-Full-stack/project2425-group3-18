import { User } from '../../model/user';
import { Profile } from '../../model/profile';

enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}

test('given valid user data, when user is created, then user is successfully created', () => {
    // given
    const userName = 'TestUser';
    const email = 'test.user@gmail.com';
    const password = 'test123?';

    // when
    const testUser = new User({
        firstName: 'Test',
        lastName: 'User',
        email,
        password,
    });

    // then
    expect(testUser.getFirstName()).toEqual('Test');
    expect(testUser.getLastName()).toEqual('User');
    expect(testUser.getEmail()).toEqual(email);
    expect(testUser.getPassword()).toEqual(password);
    expect(testUser.getProfile()).toEqual(undefined);
});

test('given a user, when profile is set, then user profile is updated', () => {
    // given
    const testUser = new User({
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@gmail.com',
        password: 'test123?',
    });

    const profile = new Profile({
        username: 'TestUserProfile',
        bio: 'Test bio',
        role: role.user,
    });

    // when
    testUser.setProfile(profile);

    // then
    expect(testUser.getProfile()).toEqual(profile);
});

test('given a user, when username is updated, then username is updated correctly', () => {
    // given
    const testUser = new User({
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@gmail.com',
        password: 'test123?',
    });

    // when
    const newUserName = 'UpdatedUserName';
    testUser.setFirstName(newUserName);

    // then
    expect(testUser.getFirstName()).toEqual(newUserName);
});

test('given a user, when password is updated, then password is updated correctly', () => {
    // given
    const testUser = new User({
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@gmail.com',
        password: 'test123?',
    });

    // when
    const newPassword = 'newPassword123!';
    testUser.setPassword(newPassword);

    // then
    expect(testUser.getPassword()).toEqual(newPassword);
});

test('given invalid username (empty), when user is created, then error is thrown', () => {
    // given
    const userName = '   ';
    const email = 'test.user@gmail.com';
    const password = 'test123?';

    // when
    const createUser = () => {
        new User({
            firstName: userName,
            lastName: 'User',
            email,
            password,
        });
    };

    // then
    expect(createUser).toThrow('Name cannot be empty');
});

test('given invalid email (empty), when user is created, then error is thrown', () => {
    // given
    const userName = 'TestUser';
    const email = '    ';
    const password = 'test123?';

    // when
    const createUser = () => {
        new User({
            firstName: 'Test',
            lastName: 'User',
            email,
            password,
        });
    };

    // then
    expect(createUser).toThrow('Email cannot be empty');
});

test('given invalid email (invalid format), when user is created, then error is thrown', () => {
    // given
    const userName = 'TestUser';
    const email = 'invalidemail';
    const password = 'test123?';

    // when
    const createUser = () => {
        new User({
            firstName: 'Test',
            lastName: 'User',
            email,
            password,
        });
    };

    // then
    expect(createUser).toThrow('Email is not valid');
});

test('given invalid password (empty), when user is created, then error is thrown', () => {
    // given
    const userName = 'TestUser';
    const email = 'test.user@gmail.com';
    const password = '    ';

    // when
    const createUser = () => {
        new User({
            firstName: 'Test',
            lastName: 'User',
            email,
            password,
        });
    };

    // then
    expect(createUser).toThrow('Password cannot be empty');
});