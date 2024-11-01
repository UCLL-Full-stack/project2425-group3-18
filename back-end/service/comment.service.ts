import { Comment } from "../model/comment";
import commentDb from "../repository/comment.db";

const getAllComments = (): Comment[] => {
    return commentDb.getAllComments();
}

export default { getAllComments };