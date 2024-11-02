import { Post } from '../model/post';
import postDb from '../repository/post.db';

const getAllPosts = (): Post[] => {
    return postDb.getAllPosts();
};

export default { getAllPosts };
