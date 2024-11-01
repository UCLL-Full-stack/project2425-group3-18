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
        role: 'user',
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
