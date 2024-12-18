import { Comment } from '../model/comment';
import commentDb from '../repository/comment.db';
import { CommentCreate, CommentInput } from '../types';
import postService from './post.service';
import profileService from './profile.service';

const getAllComments = (): Promise<Comment[]> => {
    return commentDb.getAllComments();
};

const createNewComment = async (
    { text, username }: CommentCreate,
    postId: number
): Promise<Comment> => {
    const post = await postService.getPostById(postId);
    const profile = await profileService.getProfileByUsername(username);
    const comment = new Comment({ text, profile: profile, post });
    return comment;
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

export default {
    getAllComments,
    createNewComment,
    getCommentsByUsername,
    deleteAllProfileComments,
};
