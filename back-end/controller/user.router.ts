/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the profile user.
 *         lastName:
 *           type: string
 *           description: Last name of the profile user.
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
 *     AuthInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email associated with the user who wants to login.
 *         password:
 *           type: string
 *           description: The password associated with the user who wants to login.
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token the users receives.
 *         email:
 *           type: string
 *           description: The email associated with the user who wants to login.
 *         fullname:
 *           type: string
 *           description: The fullname of the user who wants to login.
 *         role:
 *           type: string
 *           description: The role associated with the user who wants to login.
 */
import express, { Request, Response, NextFunction } from 'express';
import userService from '../service/user.service';
import { UserInput, AuthInput } from '../types';
import { checkPrime } from 'crypto';
const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *      security:
 *        - bearerAuth: []
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
 * /users/create:
 *  post:
 *      summary: Create a new user
 *      tags:
 *        - Users
 *      requestBody:
 *          description: User
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *                  example:
 *                      user:
 *                          firstName: "John"
 *                          lastName: "Doe"
 *                          email: "john@example.com"
 *                          password: "securePassword123"
 *      responses:
 *          200:
 *              description: User created successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "User created successfully"
 *                              user:
 *                                  $ref: '#/components/schemas/User'
 */
userRouter.post('/create', async (req: Request, res: Response) => {
    try {
        if (!req.body.user) {
            return res.status(400).json({
                status: 'error',
                errorMessage: 'Missing user data in request body',
            });
        }
        const user: UserInput = req.body.user;
        const createdUser = await userService.createNewUser(user);

        res.status(200).json({
            message: 'User created successfully',
            user: createdUser,
        });
    } catch (error) {
        console.error('Error creating user: ', error);
        res.status(400).json({ status: 'error', errorMessage: 'Bad Client Request' });
    }
});

/**
 * @swagger
 * /users/login:
 *  post:
 *      summary: Login as an existing user.
 *      tags:
 *        - Users
 *      requestBody:
 *          description: AuthInput
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          AuthInput:
 *                              $ref: '#/components/schemas/AuthInput'
 *                  example:
 *                          email: "john@example.com"
 *                          password: "securePassword123"
 *      responses:
 *          200:
 *              description: User successfully logged in.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Authentication Sucessful"
 *                              AuthenticationResponse:
 *                                  $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authInput: AuthInput = req.body;
        const response = await userService.authenticate(authInput);
        res.status(200).json({ message: 'Authentication succesful', ...response });
    } catch (error) {
        next(error);
    }
});

export { userRouter };
