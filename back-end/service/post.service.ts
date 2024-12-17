import { Post } from '../model/post';
import postDb from '../repository/post.db';
import { PostId, PostInput } from '../types';
import profileService from './profile.service';

const getAllPosts = (): Promise<Post[]> => {
    return postDb.getAllPosts();
};

const createNewPost = async ({ description, image, profile }: PostInput): Promise<Post> => {
    const postProfile = await profileService.getProfileByUsername(profile.username);
    const post = new Post({ description, image, profile: postProfile });
    return await postDb.createPost(post);
};

const getPostById = async (postId: number): Promise<Post> => {
    const post = await postDb.getPostById({ id: postId });
    if (post === null) {
        throw new Error(`Post with id ${postId} was not found.`);
    }
    return post;
};

export default { getAllPosts, createNewPost, getPostById };
