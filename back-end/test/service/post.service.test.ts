import postService from '../../service/post.service';
import postDb from '../../repository/post.db';
import profileService from '../../service/profile.service';
import { Post } from '../../model/post';
import { Profile } from '../../model/profile';
import { PostInput } from '../../types';

let getAllPostsMock: jest.Mock;
let createPostMock: jest.Mock;
let getPostByIdMock: jest.Mock;
let getAllPostsByProfileMock: jest.Mock;
let deletePostMock: jest.Mock;
let deleteAllProfilePostsMock: jest.Mock;
let getProfileByUsernameMock: jest.Mock;

enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}

const mockProfile = new Profile({ id: 1, username: 'user1', bio: 'bio', role: role.user });
const mockPost = new Post({
    id: 1,
    description: 'A great post',
    image: 'image.jpg',
    profile: mockProfile,
});

beforeEach(() => {
    getAllPostsMock = jest.fn();
    createPostMock = jest.fn();
    getPostByIdMock = jest.fn();
    getAllPostsByProfileMock = jest.fn();
    deletePostMock = jest.fn();
    deleteAllProfilePostsMock = jest.fn();
    getProfileByUsernameMock = jest.fn();

    postDb.getAllPosts = getAllPostsMock;
    postDb.createPost = createPostMock;
    postDb.getPostById = getPostByIdMock;
    postDb.getAllPostsByProfile = getAllPostsByProfileMock;
    postDb.deletePost = deletePostMock;
    postDb.deleteAllProfilePosts = deleteAllProfilePostsMock;
    profileService.getProfileByUsername = getProfileByUsernameMock;
});

it('should get all posts', async () => {
    const mockPosts = [mockPost];

    getAllPostsMock.mockResolvedValue(mockPosts);

    const result = await postService.getAllPosts();

    expect(result).toEqual(mockPosts);
    expect(getAllPostsMock).toHaveBeenCalledTimes(1);
});

it('should create a new post', async () => {
    const postInput: PostInput = {
        description: 'A new post',
        image: 'image2.jpg',
        profile: { username: 'user1', bio: 'cool user', role: role.user },
    };

    // Mock profile and postDb methods
    getProfileByUsernameMock.mockResolvedValue(mockProfile);
    createPostMock.mockResolvedValue(new Post({ ...postInput, profile: mockProfile }));

    const result = await postService.createNewPost(postInput);

    expect(result.getDescription()).toBe(postInput.description);
    expect(result.getImage()).toBe(postInput.image);
    expect(createPostMock).toHaveBeenCalledTimes(1);
});

it('should get a post by id', async () => {
    getPostByIdMock.mockResolvedValue(mockPost);

    const result = await postService.getPostById(1);

    expect(result).toEqual(mockPost);
    expect(getPostByIdMock).toHaveBeenCalledWith({ id: 1 });
});

it('should throw an error if post is not found when getting post by id', async () => {
    getPostByIdMock.mockResolvedValue(null);

    await expect(postService.getPostById(999)).rejects.toThrow('Post with id 999 was not found.');
});

it('should get posts by username', async () => {
    const mockPosts = [mockPost];

    getProfileByUsernameMock.mockResolvedValue(mockProfile);
    getAllPostsByProfileMock.mockResolvedValue(mockPosts);

    const result = await postService.getPostsByUsername('user1');

    expect(result).toEqual(mockPosts);
    expect(getAllPostsByProfileMock).toHaveBeenCalledWith({ id: mockProfile.getId() });
});

it('should delete a post', async () => {
    getPostByIdMock.mockResolvedValue(mockPost);
    deletePostMock.mockResolvedValue(mockPost);

    const result = await postService.deletePost(1);

    expect(result).toEqual(mockPost);
    expect(deletePostMock).toHaveBeenCalledWith(1);
});

it('should throw an error if post does not exist when deleting a post', async () => {
    getPostByIdMock.mockResolvedValue(null);

    await expect(postService.deletePost(999)).rejects.toThrow(
        'Post with id 999 could not be deleted.'
    );
});

it('should delete all posts for a profile', async () => {
    const count = 3;
    deleteAllProfilePostsMock.mockResolvedValue(count);

    const result = await postService.deleteAllProfilePosts('user1');

    expect(result).toBe('3 posts were deleted.');
    expect(deleteAllProfilePostsMock).toHaveBeenCalledWith('user1');
});

it('should throw an error if posts could not be deleted', async () => {
    deleteAllProfilePostsMock.mockRejectedValue(new Error('Error deleting posts'));

    await expect(postService.deleteAllProfilePosts('user1')).rejects.toThrow(
        'Posts could not be deleted'
    );
});
