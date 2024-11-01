import express, { NextFunction, Request, Response } from 'express';
import postService from "../service/post.service";

const postRouter = express.Router();

/**
 * @swagger
 * /posts:
 *  get:
 *      summary: Get all posts.
 *      responses:
 *          200:
 *              description: An array of post objects.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
 */
postRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await postService.getAllPosts();
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({status:'error', errorMessage: "Bad Client Request"});
    }
});

export { postRouter }