/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the profile.
 *         bio:
 *           type: string
 *           description: Bio of the profile user.
 *         role:
 *           type: string
 *           description: Role of the user in the platform. Must be either "User", "Admin", or "Moderator".
 *           enum: [User, Admin, Moderator]
 */
import express, { Request, Response, NextFunction } from 'express';
import profileService from '../service/profile.service';
import { ProfileInput } from '../types';
const profileRouter = express.Router();

/**
 * @swagger
 * /profiles:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Retrieve a list of profiles.
 *      tags:
 *        - Profiles
 *      responses:
 *          200:
 *              description: An array of Profile objects.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await profileService.getAllProfiles();
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ status: 'error', errorMessage: 'Bad Client Request' });
    }
});

/**
 * @swagger
 * /profiles/{username}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a profile by username.
 *      tags:
 *          - Profiles
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: The profile username.
 *      responses:
 *          200:
 *              description: A profile object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile = await profileService.getProfileByUsername(String(req.params.username));
        res.status(200).json(profile)
    } catch (error) {
        next(error)
    }
})

/**
 *@swagger
 * /profiles/create:
 *  post:
 *      summary: Create a new profile, associated with a user.
 *      tags:
 *        - Profiles
 *      requestBody:
 *          description: Profile data and associated user's email.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          profile:
 *                              type: object
 *                              properties:
 *                                  username:
 *                                      type: string
 *                                  bio:
 *                                      type: string
 *                                  role:
 *                                      type: string
 *                              required:
 *                                  - username
 *                                  - role
 *                          email:
 *                              type: string
 *                      required:
 *                          - profile
 *                          - email
 *                  example:
 *                      profile:
 *                          username: "John_Doe"
 *                          bio: "Hi! I'm John."
 *                          role: "User"
 *                      email: "john@example.com"
 *      responses:
 *          200:
 *              description: A created Profile object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profile'
 */
profileRouter.post('/create', async (req: Request, res: Response) => {
    try {
        if (!req.body.profile) {
            return res.status(400).json({
                status: 'error',
                errorMessage: 'Missing profile data in request body',
            });
        }
        const profile: ProfileInput = req.body.profile;
        const email: string = req.body.email;
        console.log(email);
        const createdProfile = await profileService.createProfile(profile, email);

        res.status(200).json({
            message: 'Profile has been created succesfully',
            profile: createdProfile,
        });
    } catch (error) {
        console.error('Error creating profile: ', error);
        res.status(400).json({ status: 'error', errorMessage: 'Bad Client Request' });
    }
});

export { profileRouter };
