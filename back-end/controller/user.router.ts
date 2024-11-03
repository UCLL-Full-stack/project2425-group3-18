/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: The user's name.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         password:
 *           type: string
 *           description: The user's password.
 *         profile:
 *           $ref: '#/components/schemas/Profile'
 *           nullable: true
 *           description: The profile associated with the user.
 *     Profile:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the profile user.
 *         lastName:
 *           type: string
 *           description: Last name of the profile user.
 *         bio:
 *           type: string
 *           description: Bio of the profile user.
 *         role:
 *           type: string
 *           description: Role of the user in the platform.
 *         user:
 *           $ref: '#/components/schemas/User'
 *           description: The user associated with this profile.
 *         posts:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Description of the post.
 *               image:
 *                 type: string
 *                 description: Image URL of the post.
 *           description: List of posts made by the user.
 *         koten:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Kot'
 *           description: List of koten associated with the profile.
 */

import express, { Request, Response, NextFunction } from 'express';
import userService from '../service/user.service';
import { ProfileInput, UserInput } from '../types';
import profileService from '../service/profile.service';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Retrieve a list of users.
 *      tags:
 *        - Users
 *      responses:
 *          200:
 *              description: An array of User objects.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await userService.getAllUsers();
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ status: 'error', errorMessage: 'Bad Client Request' });
    }
});

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Create a new user and associated profile.
 *      tags:
 *        - Users
 *      requestBody:
 *          description: User and profile data
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *                          profile:
 *                              $ref: '#/components/schemas/Profile'
 *                  example:
 *                      user:
 *                          userName: "john_doe"
 *                          email: "john@example.com"
 *                          password: "securePassword123"
 *                      profile:
 *                          firstName: "John"
 *                          lastName: "Doe"
 *                          bio: "Software Developer"
 *                          role: "User"
 *                          posts: []
 *                          koten: []
 *      responses:
 *          200:
 *              description: User and profile created successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "User and profile created successfully"
 *                              user:
 *                                  $ref: '#/components/schemas/User'
 *                              profile:
 *                                  $ref: '#/components/schemas/Profile'
 *          400:
 *              description: Bad client request.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: "error"
 *                              errorMessage:
 *                                  type: string
 *                                  example: "Bad Client Request"
 */
userRouter.post('/', (req: Request, res: Response) => {
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    try {
        if (!req.body.user  || !req.body.profile) {
            return res.status(400).json({
                status: 'error',
                errorMessage: 'Missing user or profile data in request body',
            });
        }
        const user: UserInput = req.body.user;
        const profile: ProfileInput = req.body.profile;

        const createdUser = userService.createUser(user);
        const createdProfile = profileService.createProfile(profile, user.email);

        res.status(200).json({
            message: 'User and profile created successfully',
            user: createdUser,
            profile: createdProfile,
        });
    } catch (error) {
        console.error('Error creating user and profile:', error);
        res.status(400).json({ status: 'error', errorMessage: 'Bad Client Request' });
    }
});

export { userRouter };
