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

export default { getAllComments, createNewComment };
