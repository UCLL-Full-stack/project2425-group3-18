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
import postService from '../service/post.service';
import { PostInput } from '../types';
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
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /posts/create:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      summary: Create a new post.
 *      tags:
 *        - Posts
 *      requestBody:
 *          description: Data required to create a post.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          post:
 *                              type: object
 *                              properties:
 *                                  description:
 *                                      type: string
 *                                      description: The description of the post.
 *                                  image:
 *                                      type: string
 *                                      description: The URL of the post image.
 *                                  profile:
 *                                      $ref: '#/components/schemas/Profile'
 *                                      description: The profile associated with the post.
 *                              required:
 *                                  - description
 *                                  - image
 *                                  - profile
 *                  example:
 *                      post:
 *                          description: "This is a cool post!"
 *                          image: "https://example.com/post-image.jpg"
 *                          profile:
 *                              username: "John_Doe"
 *                              bio: "Just a cool person."
 *                              role: "User"
 *      responses:
 *          200:
 *              description: Post successfully created.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Post created successfully"
 *                              post:
 *                                  $ref: '#/components/schemas/Post'
 */
postRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.post) {
            return res.status(400).json({
                status: 'error',
                errorMessage: 'Missing post data in request body',
            });
        }
        const post: PostInput = req.body.post;
        const createdPost = await postService.createNewPost(post);

        res.status(200).json({
            message: 'Post created successfully',
            post: createdPost,
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /posts/{username}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all posts related to a profile with a certain username.
 *      tags:
 *          - Posts
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: The profile username.
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
postRouter.get('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await postService.getPostsByUsername(String(req.params.username));
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /posts/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete a post.
 *      tags:
 *          - Posts
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The ID of the post that needs to be deleted.
 *      responses:
 *          200:
 *              description: Message and the post that has been deleted.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Post was deleted successfully"
 *                              deletedPost:
 *                                  $ref: '#/components/schemas/Post'
 */
postRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedPost = await postService.deletePost(Number(req.params.id));
        res.status(200).json({
            message: 'Post was deleted succesfully',
            deletedPost: deletedPost,
        });
    } catch (error) {
        next(error);
    }
});
export { postRouter };
