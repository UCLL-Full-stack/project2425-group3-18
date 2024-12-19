import commentService from '../../service/comment.service';
import commentDb from '../../repository/comment.db';
import postDb from '../../repository/post.db';
import { Comment } from '../../model/comment';
import { Post } from '../../model/post';
import { Profile } from '../../model/profile';
import postService from '../../service/post.service';
import profileService from '../../service/profile.service';

enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}

let getAllCommentsMock: jest.Mock;
let getPostByIdMock: jest.Mock;
let getProfileByUsernameMock: jest.Mock;
let createCommentMock: jest.Mock;
let getAllCommentsByProfileMock: jest.Mock;
let deleteAllProfileCommentsMock: jest.Mock;
let getAllPostCommentsMock: jest.Mock;

const mockPost = new Post({
    id: 1,
    description: 'Post 1',
    image: 'image1.jpg',
    profile: undefined,
});

const mockProfile = new Profile({ id: 1, username: 'user1', bio: 'bio', role: role.user });

beforeEach(() => {
    getAllCommentsMock = jest.fn();
    getPostByIdMock = jest.fn();
    getProfileByUsernameMock = jest.fn();
    createCommentMock = jest.fn();
    getAllCommentsByProfileMock = jest.fn();
    deleteAllProfileCommentsMock = jest.fn();
    getAllPostCommentsMock = jest.fn();

    commentDb.getAllComments = getAllCommentsMock;
    postService.getPostById = getPostByIdMock;
    profileService.getProfileByUsername = getProfileByUsernameMock;
    commentDb.createComment = createCommentMock;
    commentDb.getAllCommentsByProfile = getAllCommentsByProfileMock;
    commentDb.deleteAllProfileComments = deleteAllProfileCommentsMock;
    commentDb.getAllPostComments = getAllPostCommentsMock;

    postDb.getPostById = jest.fn().mockResolvedValue(mockPost);
});

it('should get all comments', async () => {
    const mockComments = [
        new Comment({ text: 'Great post!', rating: 5, profile: mockProfile, post: mockPost }),
    ];

    getAllCommentsMock.mockResolvedValue(mockComments);

    const result = await commentService.getAllComments();

    expect(result).toEqual(mockComments);
    expect(getAllCommentsMock).toHaveBeenCalledTimes(1);
});

it('should create a new comment', async () => {
    const mockCommentCreate = { text: 'Nice post!', rating: 5, username: 'user1' };
    const mockPostResult = {
        id: 1,
        description: 'Post 1',
        image: 'image1.jpg',
        profile: undefined,
    };
    const mockProfileResult = { id: 1, username: 'user1', bio: 'bio', role: role.user };

    getPostByIdMock.mockResolvedValue(mockPostResult);
    getProfileByUsernameMock.mockResolvedValue(mockProfileResult);
    createCommentMock.mockResolvedValue(
        new Comment({
            ...mockCommentCreate,
            profile: new Profile(mockProfileResult),
            post: new Post(mockPostResult),
        })
    );

    const result = await commentService.createNewComment(mockCommentCreate, 1);

    expect(result.getText()).toBe(mockCommentCreate.text);
    expect(result.getRating()).toBe(mockCommentCreate.rating);
    expect(result.getProfile().getUsername()).toBe(mockProfileResult.username);
    expect(result.getPost().getId()).toBe(mockPostResult.id);
    expect(createCommentMock).toHaveBeenCalledTimes(1);
});

it('should get comments by username', async () => {
    const mockComments = [
        new Comment({ text: 'Nice post!', rating: 5, profile: mockProfile, post: mockPost }),
    ];

    getProfileByUsernameMock.mockResolvedValue(mockProfile);
    getAllCommentsByProfileMock.mockResolvedValue(mockComments);

    const result = await commentService.getCommentsByUsername('user1');

    expect(result).toEqual(mockComments);
    expect(getAllCommentsByProfileMock).toHaveBeenCalledWith({ id: mockProfile.getId() });
});

it('should delete all profile comments', async () => {
    const count = 3;
    deleteAllProfileCommentsMock.mockResolvedValue(count);

    const result = await commentService.deleteAllProfileComments('user1');

    expect(result).toBe('3 comments were deleted.');
    expect(deleteAllProfileCommentsMock).toHaveBeenCalledWith('user1');
});

it('should get all comments for a post', async () => {
    const mockPostId = 1;
    const mockComments = [
        new Comment({ text: 'Great post!', rating: 5, profile: mockProfile, post: mockPost }),
    ];

    getAllPostCommentsMock.mockResolvedValue(mockComments);

    const result = await commentService.getAllPostComments(mockPostId);

    expect(result).toEqual(mockComments);
    expect(getAllPostCommentsMock).toHaveBeenCalledWith(mockPostId);
});