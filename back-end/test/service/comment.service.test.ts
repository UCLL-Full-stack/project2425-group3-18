import { Post } from "../../model/post";
import { Comment } from "../../model/comment";
import commentService from '../../service/comment.service';
import commentDb from '../../repository/comment.db';

// Mock Data
const mockPost = new Post({
    description: 'Sample post description',
    image: 'sample-image-url.jpg',
    comments: []
});

const mockComments: Comment[] = [
    new Comment({ text: 'Great post!', post: mockPost }),
    new Comment({ text: 'Very helpful, thanks!', post: mockPost })
];

// Setup Mocks
beforeEach(() => {
    jest.spyOn(commentDb, 'getAllComments').mockReturnValue(mockComments);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: comments exist in database; when: getAllComments is called; then: all comments are returned;', () => {
    // Act
    const result = commentService.getAllComments();

    // Assert
    expect(commentDb.getAllComments).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockComments);
    expect(result[0].getText()).toBe('Great post!');
    expect(result[0].getPost()).toBe(mockPost);
});