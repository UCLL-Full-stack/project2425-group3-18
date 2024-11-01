import express, { NextFunction, Request, Response } from 'express';
import postService from "../service/post.service";

const postRouter = express.Router();

postRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await postService.getAllPosts();
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({status:'error', errorMessage: "Bad Client Request"});
    }
});

export { postRouter }