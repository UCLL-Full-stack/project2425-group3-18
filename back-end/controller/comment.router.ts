import { Comment } from "../model/comment";
import express, { NextFunction, Request, Response } from 'express';
import commentService from "../service/comment.service";

const commentRouter = express.Router();

commentRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await commentService.getAllComments();
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json({status:'error', errorMessage: "Bad Client Request"});
    }
});

export { commentRouter }