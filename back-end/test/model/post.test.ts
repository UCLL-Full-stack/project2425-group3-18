import { Post } from '../../model/post';
import { Profile } from '../../model/profile';

const validDescription = 'This is a valid description.';
const validImage = 'http://example.com/image.jpg';
enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}
const validProfile = new Profile({
    id: 1,
    username: 'test_user',
    bio: 'A short bio.',
    role: role.user,
});

describe('Post', () => {
    test('given valid values, when Post is created, then Post is created with those values', () => {
        const post = new Post({
            id: 1,
            description: validDescription,
            image: validImage,
            profile: validProfile,
        });

        expect(post.getId()).toEqual(1);
        expect(post.getDescription()).toEqual(validDescription);
        expect(post.getImage()).toEqual(validImage);
        expect(post.getProfile()).toEqual(validProfile);
    });

    test('given a Post, when setting a new description, then description is updated', () => {
        const post = new Post({
            id: 1,
            description: validDescription,
            image: validImage,
            profile: validProfile,
        });

        const newDescription = 'Updated description.';
        post.setDescription(newDescription);

        expect(post.getDescription()).toEqual(newDescription);
    });

    test('given a Post, when setting a new image, then image is updated', () => {
        const post = new Post({
            id: 1,
            description: validDescription,
            image: validImage,
            profile: validProfile,
        });

        const newImage = 'Updated image.';
        post.setDescription(newImage);

        expect(post.getDescription()).toEqual(newImage);
    });

    test('given two identical Posts, when compared, then equals method returns true', () => {
        const post1 = new Post({
            id: 1,
            description: validDescription,
            image: validImage,
            profile: validProfile,
        });

        const post2 = new Post({
            id: 1,
            description: validDescription,
            image: validImage,
            profile: validProfile,
        });

        expect(post1.equals(post2)).toBe(true);
    });

    test("given an empty description, when creating a Post, then it throws an error 'Description cannot be empty'", () => {
        expect(() => {
            new Post({ id: 1, description: '', image: validImage, profile: validProfile });
        }).toThrow('Description cannot be empty');
    });

    test("given an empty image, when creating a Post, then it throws an error 'Image cannot be empty'", () => {
        expect(() => {
            new Post({ id: 1, description: validDescription, image: '', profile: validProfile });
        }).toThrow('Image cannot be empty');
    });

    test('given a Post, when setting an invalid description, then it throws an error', () => {
        const post = new Post({
            id: 1,
            description: validDescription,
            image: validImage,
            profile: validProfile,
        });

        expect(() => {
            post.setDescription('');
        }).toThrow('Description cannot be empty');
    });

    test('given a Post, when setting an invalid image, then it throws an error', () => {
        const post = new Post({
            id: 1,
            description: validDescription,
            image: validImage,
            profile: validProfile,
        });

        expect(() => {
            post.setImage('');
        }).toThrow('Image cannot be empty');
    });
});
