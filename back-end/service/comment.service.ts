import { Comment } from '../model/comment';
import commentDb from '../repository/comment.db';
import postDb from '../repository/post.db';
import { CommentCreate, CommentInput } from '../types';
import postService from './post.service';
import profileService from './profile.service';

const getAllComments = (): Promise<Comment[]> => {
    return commentDb.getAllComments();
};

const createNewComment = async (
    { text, rating, username }: CommentCreate,
    postId: number
): Promise<Comment> => {
    const post = await postService.getPostById(postId);
    const profile = await profileService.getProfileByUsername(username);
    const comment = new Comment({ text, rating, profile: profile, post });
    return await commentDb.createComment(comment);
};

const getCommentsByUsername = async (username: string): Promise<Comment[]> => {
    const id = (await profileService.getProfileByUsername(username)).getId();
    if (!id) {
        throw new Error(`Profile with username ${username} does not exist.`);
    }
    return await commentDb.getAllCommentsByProfile({ id });
};

const deleteAllProfileComments = async (username: string): Promise<string> => {
    const count = await commentDb.deleteAllProfileComments(username);
    return `${count} comments were deleted.`;
};

const getAllPostComments = async (postId: number): Promise<Comment[]> => {
    if (!(await postDb.getPostById({ id: postId }))) {
        throw new Error(`Post with id ${postId} does not exist`);
    }
    return await commentDb.getAllPostComments(postId);
};

export default {
    getAllComments,
    createNewComment,
    getCommentsByUsername,
    deleteAllProfileComments,
    getAllPostComments,
};
