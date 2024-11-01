import express, { NextFunction, Request, Response } from 'express';
import commentService from "../service/comment.service";

const commentRouter = express.Router();

/**
 * @swagger
 * /comments:
 *  get:
 *      summary: Get all comments.
 *      responses:
 *          200:
 *              description: An array of comment objects.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Comment'
 */
commentRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await commentService.getAllComments();
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json({ status: 'error', errorMessage: "Bad Client Request" });
    }
});

export { commentRouter };
