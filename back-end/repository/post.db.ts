import { Post } from '../model/post';
import { Comment } from '../model/comment';

const post1 = new Post({
    description: 'This is the first post.',
    image: 'https://example.com/image1.jpg',
    comments: [],
});

const post2 = new Post({
    description: 'This is the second post.',
    image: 'https://example.com/image2.jpg',
    comments: [],
});

const posts: Post[] = [post1, post2];

const getAllPosts = (): Post[] => {
    return posts;
};

export default {
    getAllPosts,
};
