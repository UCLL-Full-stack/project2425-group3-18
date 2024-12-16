/**
 * @swagger
 *   components:
 *    schemas:
 *      Comment:
 *          type: object
 *          properties:
 *            text:
 *              type: string
 *              description: The content of the comment.
 *            post:
 *              $ref: '#/components/schemas/Post'
 *              description: The post associated with this comment.
 *            profile:
 *              $ref: '#/components/schemas/Profile'
 *              description: The profile associated with this comment.
 */
import express, { NextFunction, Request, Response } from 'express';
import commentService from '../service/comment.service';
const commentRouter = express.Router();
/**
 * @swagger
 * /comments:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Retrieve a list of all comments.
 *      tags:
 *        - Comments
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
    } catch (error) {
        next(error);
    }
});

export { commentRouter };
    