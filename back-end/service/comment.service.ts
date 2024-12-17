import { Comment } from '../model/comment';
import commentDb from '../repository/comment.db';

const getAllComments = (): Promise<Comment[]> => {
    return commentDb.getAllComments();
};

//const createNewComment = async ({})

export default { getAllComments };
