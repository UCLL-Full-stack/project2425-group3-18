import { Post } from "../../model/post";
import postDb from "../../repository/post.db";
import postService from "../../service/post.service";

// Mock Data
const mockPost1 = new Post({
    description: 'Sample post description 1',
    image: 'sample-image-url-1.jpg',
    comments: []
});

const mockPost2 = new Post({
    description: 'Sample post description 2',
    image: 'sample-image-url-2.jpg',
    comments: []
});

const mockPosts: Post[] = [mockPost1, mockPost2];

// Setup Mocks
beforeEach(() => {
    jest.spyOn(postDb, 'getAllPosts').mockReturnValue(mockPosts);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: posts exist in database; when: getAllPosts is called; then: all posts are returned;', () => {
    // Act
    const result = postService.getAllPosts();

    // Assert
    expect(postDb.getAllPosts).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockPosts);
    expect(result[0].getDescription()).toBe('Sample post description 1');
    expect(result[0].getImage()).toBe('sample-image-url-1.jpg');
    expect(result[1].getDescription()).toBe('Sample post description 2');
    expect(result[1].getImage()).toBe('sample-image-url-2.jpg');
});