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

test('given: a profile; when: updating firstname field with valid firstname; then: firstname is updated', () => {
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
    const profile = new Profile({ firstName, lastName, bio, role, user, posts, koten });

    //when
    const newFirstName: string = 'newTest';
    profile.setFirstName(newFirstName);

    //then
    expect(profile.getFirstName()).toEqual(newFirstName);
});

test('given: a profile; when: updating lastname field with valid lastname; then: lastname is updated', () => {
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
    const profile = new Profile({ firstName, lastName, bio, role, user, posts, koten });

    //when
    const newLastName: string = 'newProfile';
    profile.setLastName(newLastName);

    //then
    expect(profile.getLastName()).toEqual(newLastName);
});

test('given: a profile; when: updating bio field with valid bio; then: bio is updated', () => {
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
    const profile = new Profile({ firstName, lastName, bio, role, user, posts, koten });

    //when
    const newBio: string = 'Testing is fun!';
    profile.setBio(newBio);

    //then
    expect(profile.getBio()).toEqual(newBio);
});

test('given: a profile; when: updating role field with valid role; then: role is updated', () => {
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
    const profile = new Profile({ firstName, lastName, bio, role, user, posts, koten });

    //when
    const newRole: string = 'Admin';
    profile.setRole(newRole);

    //then
    expect(profile.getRole()).toEqual(newRole);
});

test('given: a profile; when: updating user field with valid user; then: user is updated', () => {
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
    const profile = new Profile({ firstName, lastName, bio, role, user, posts, koten });

    //when
    const newUser: User = new User({
        userName: 'newTestProfile',
        email: 'test.profiletesting@gmail.com',
        password: 'test123?56780824',
    });
    profile.setUser(newUser);

    //then
    expect(profile.getUser()).toEqual(newUser);
});

test('given: a profile; when:adding a new valid post; then:post is added to posts;', () => {
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
    const profile = new Profile({ firstName, lastName, bio, role, user, posts, koten });

    //when
    const post = new Post({
        description: 'a new post',
        image: 'http://example.com/image.jpg',
        comments: [],
    });
    profile.addPost(post);

    //then
    expect(profile.getPosts()).toContain(post);
});

//test for adding new kot to koten
test('given: a profile; when:adding a new valid kot; then:kot is added to koten;', () => {
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
    const profile = new Profile({ firstName, lastName, bio, role, user, posts, koten });

    //when
    const kot = new Kot({
        location: 'teststreet 54 3000 Leuven',
        price: 300,
        surfaceSpace: 19,
        profiles: [],
    });
    kot.addProfile(profile);
    profile.addKot(kot);

    //then
    expect(profile.getKoten()).toContain(kot);
});

//unhappy test (add validation)

test('given: all field valid except firstName; when: profile is created; then: error is thrown', () => {
    //given
    const firstName: string = '         ';
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
    const createNewProfile = () => {
        new Profile({ firstName, lastName, bio, role, user, posts, koten });
    };

    //then
    expect(createNewProfile).toThrow('Name cannot be empty');
});

test('given: all field valid except username; when: profile is created; then: error is thrown', () => {
    //given
    const firstName: string = 'Test';
    const lastName: string = '                      ';
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
    const createNewProfile = () => {
        new Profile({ firstName, lastName, bio, role, user, posts, koten });
    };

    //then
    expect(createNewProfile).toThrow('Name cannot be empty');
});

test('given: all field valid except role (empty); when: profile is created; then: error is thrown', () => {
    //given
    const firstName: string = 'Test';
    const lastName: string = 'Profile';
    const bio: string = 'I am a test Profile';
    const role: string = '              ';
    const user: User = new User({
        userName: 'testProfile',
        email: 'test.profile@gmail.com',
        password: 'test123?',
    });
    const posts: Array<Post> = [];
    const koten: Array<Kot> = [];

    //when
    const createNewProfile = () => {
        new Profile({ firstName, lastName, bio, role, user, posts, koten });
    };

    //then
    expect(createNewProfile).toThrow('Role cannot be empty');
});

test('given: all field valid except role (wrong); when: profile is created; then: error is thrown', () => {
    //given
    const firstName: string = 'Test';
    const lastName: string = 'Profile';
    const bio: string = 'I am a test Profile';
    const role: string = 'TESTINGLOVERSUNITE';
    const user: User = new User({
        userName: 'testProfile',
        email: 'test.profile@gmail.com',
        password: 'test123?',
    });
    const posts: Array<Post> = [];
    const koten: Array<Kot> = [];

    //when
    const createNewProfile = () => {
        new Profile({ firstName, lastName, bio, role, user, posts, koten });
    };

    //then
    expect(createNewProfile).toThrow('Role needs to be either User, Admin or Moderator');
});
