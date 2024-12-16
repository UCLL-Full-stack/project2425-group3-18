/**
 * @swagger
 *   components:
 *    schemas:
 *      Post:
 *          type: object
 *          properties:
 *            description:
 *              type: string
 *              description: The description of the post.
 *            image:
 *              type: string
 *              description: The URL of the post image.
 *            profile:
 *              $ref: '#/components/schemas/Profile'
 *              description: The profile related to the post
 */
import express, { NextFunction, Request, Response } from 'express';
import postService from "../service/post.service";
const postRouter = express.Router();

/**
 * @swagger
 * /posts:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Retrieve a list of posts.
 *      tags:
 *        - Posts
 *      responses:
 *          200:
 *              description: An array of Post objects.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
 */
postRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ status: 'error', errorMessage: "Bad Client Request" });
    }
});

export { postRouter };
