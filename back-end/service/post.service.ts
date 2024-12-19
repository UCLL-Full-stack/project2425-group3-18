import { strictTransportSecurity } from 'helmet';
import { Post } from '../model/post';
import postDb from '../repository/post.db';
import { PostInput } from '../types';
import profileService from './profile.service';
import commentService from './comment.service';

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

const getPostsByUsername = async (username: string): Promise<Post[]> => {
    const id = (await profileService.getProfileByUsername(username)).getId();
    if (!id) {
        throw new Error(`Profile with username ${username} does not exist.`);
    }
    return await postDb.getAllPostsByProfile({ id });
};

const deletePost = async (postId: number): Promise<Post> => {
    try {
        await getPostById(postId);
        return await postDb.deletePost(postId);
    } catch (error) {
        throw new Error(`Post with id ${postId} could not be deleted.`);
    }
};

const deleteAllProfilePosts = async (username: string): Promise<string> => {
    try {
        const count = await postDb.deleteAllProfilePosts(username);
        return `${count} posts were deleted.`;
    } catch (error) {
        throw new Error('Posts could not be deleted');
    }
};

export default {
    getAllPosts,
    createNewPost,
    getPostById,
    getPostsByUsername,
    deletePost,
    deleteAllProfilePosts,
};
