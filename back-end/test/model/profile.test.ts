import { Kot } from '../../model/kot';
import { Post } from '../../model/post';
import { Profile } from '../../model/profile';
import { User } from '../../model/user';

/*
test('given:; when:; then:;', () => {

})
*/

//happy tests

test('given: all field values valid; when: profile is created; then: profile is created', () => {
    //given
    const firstName: string = 'Test';
    const lastName: string = 'Profile';
    const bio: string = 'I am a test Profile';
    const role: string = 'User';
    const user: User = new User({
        userName: 'testProfile',
        email: 'test.profile@gmail.com',
        password: 'test123?',
    });
    const posts: Array<Post> = [];
    const koten: Array<Kot> = [];

    //when
    const profile = new Profile({ firstName, lastName, bio, role, user, posts, koten });

    //then
    expect(profile.getFirstName()).toEqual(firstName);
    expect(profile.getLastName()).toEqual(lastName);
    expect(profile.getBio()).toEqual(bio);
    expect(profile.getRole()).toEqual(role);
    expect(profile.getUser()).toEqual(user);
    expect(profile.getPosts()).toEqual(posts);
    expect(profile.getKoten()).toEqual(koten);
});
