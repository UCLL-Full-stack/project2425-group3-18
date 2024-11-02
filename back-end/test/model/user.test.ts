import te from 'date-fns/esm/locale/te/index.js';
import { Kot } from '../../model/kot';
import { Post } from '../../model/post';
import { Profile } from '../../model/profile';
import { User } from '../../model/user';

/*
test('given:; when:; then:;', () => {

})
*/

const posts: Array<Post> = [];
const koten: Array<Kot> = [];

//happy tests

test('given: all fields valid values; when: user is created; then: user is created;', () => {
    //given
    const userName: string = 'TestUser';
    const email: string = 'test.user@gmail.com';
    const password: string = 'test123?';

    //when
    const testUser: User = new User({ userName, email, password });

    //then
    expect(testUser.getUserName()).toEqual(userName);
    expect(testUser.getEmail()).toEqual(email);
    expect(testUser.getPassword()).toEqual(password);
    expect(testUser.getProfile()).toEqual(null);
});

test('given: a user; when: profile is updated; then: profile is;', () => {
    //given
    const userName: string = 'TestUser';
    const email: string = 'test.user@gmail.com';
    const password: string = 'test123?';
    const testUser: User = new User({ userName, email, password });

    //when
    const profile: Profile = new Profile({
        firstName: 'test',
        lastName: 'user',
        bio: 'I am a test user',
        role: 'User',
        user: testUser,
        posts: posts,
        koten: koten,
    });
    testUser.setProfile(profile);

    //then
    expect(testUser.getUserName()).toEqual(userName);
    expect(testUser.getEmail()).toEqual(email);
    expect(testUser.getPassword()).toEqual(password);
    expect(testUser.getProfile()).toEqual(profile);
});

test('given: a user; when: updating username field with valid username; then: username field is updated;', () => {
    //given
    const userName: string = 'TestUser';
    const email: string = 'test.user@gmail.com';
    const password: string = 'test123?';
    const testUser: User = new User({ userName, email, password });

    //when
    const newUserName: string = 'newUserName';
    testUser.setUserName(newUserName);

    //then
    expect(testUser.getUserName()).toEqual(newUserName);
});

test('given: a user; when: updating email field with valid email; then: email field is updated', () => {
    // given
    const userName: string = 'TestUser';
    const email: string = 'test.user@gmail.com';
    const password: string = 'test123?';
    const testUser: User = new User({ userName, email, password });

    // when
    const newEmail: string = 'new.email@gmail.com';
    testUser.setEmail(newEmail);

    // then
    expect(testUser.getEmail()).toEqual(newEmail);
});

test('given: a user; when: updating password field with valid password; then: password field is updated', () => {
    // given
    const userName: string = 'TestUser';
    const email: string = 'test.user@gmail.com';
    const password: string = 'test123?';
    const testUser: User = new User({ userName, email, password });

    // when
    const newPassword: string = 'newTest123!';
    testUser.setPassword(newPassword);

    // then
    expect(testUser.getPassword()).toEqual(newPassword);
});

//unhappy tests

test('given: all field valid except username; when: user is created; then: error is thrown', () => {
    //given
    const userName: string = '    ';
    const email: string = 'test.user@gmail.com';
    const password: string = 'test123?';

    //when
    const createNewUser = () => {
        new User({ userName, email, password });
    };

    //then
    expect(createNewUser).toThrow('UserName cannot be empty');
});

test('given: all field valid except email; when: user is created; then: error is thrown', () => {
    //given
    const userName: string = 'TestUser';
    const email: string = '        ';
    const password: string = 'test123?';

    //when
    const createNewUser = () => {
        new User({ userName, email, password });
    };

    //then
    expect(createNewUser).toThrow('Email cannot be empty');
});

test('given: all field valid except password; when: user is created; then: error is thrown', () => {
    //given
    const userName: string = 'TestUser';
    const email: string = 'test.user@gmail.com';
    const password: string = '                                              ';

    //when
    const createNewUser = () => {
        new User({ userName, email, password });
    };

    //then
    expect(createNewUser).toThrow('Password cannot be empty');
});

test('given: all field valid except email; when: user is created; then: error is thrown', () => {
    //given
    const userName: string = 'TestUser';
    const email: string = 'ILoveTesting';
    const password: string = 'test123?';

    //when
    const createNewUser = () => {
        new User({ userName, email, password });
    };

    //then
    expect(createNewUser).toThrow('Email is not valid');
});
