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
import { CommentCreate, CommentInput } from '../types';
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

/**
 * @swagger
 * /comments/create:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      summary: Create a new comment, associated with a post and a profile.
 *      tags:
 *       - Comments
 *      requestBody:
 *          description: Comment data and associated postId.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          commentCreate:
 *                              type: object
 *                              properties:
 *                                  text:
 *                                      type: string
 *                                  username:
 *                                      type: string
 *                          postId:
 *                              type: number
 *          example:
 *              commentCreate:
 *                  text: cool comment
 *                  username: John_Doe
 *              postId: 1
 *      responses:
 *          200:
 *              description: A created Comment object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comment'
 */
commentRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.comment) {
            return res.status(400).json({
                status: 'error',
                errorMessage: 'Missing comment data in request body',
            });
        }
        const comment: CommentCreate = req.body.comment;
        const postId: number = req.body.postId;
        const createdComment = await commentService.createNewComment(comment, postId);

        res.status(200).json({
            message: 'Comment has been created succesfully',
            comment: createdComment,
        });
    } catch (error) {
        next(error);
    }
});

export { commentRouter };
