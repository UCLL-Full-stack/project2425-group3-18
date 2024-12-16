/**
 * @swagger
 * components:
 *   schemas:
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
 *           description: Role of the user in the platform. Must be either "User", "Admin", or "Moderator".
 *           enum: [User, Admin, Moderator]
 *         user:
 *           $ref: '#/components/schemas/User'
 *           description: The user associated with this profile.
 *         posts:
 *           type: array
 *           description: List of posts made by the user.
 *           items:
 *             $ref: '#/components/schemas/Post'
 *         koten:
 *           type: array
 *           description: List of koten associated with the profile.
 *           items:
 *             $ref: '#/components/schemas/Kot'
 *
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
 *
 *     Post:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: Description of the post.
 *         image:
 *           type: string
 *           description: Image URL of the post.
 *
 *     Kot:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the kot.
 *         description:
 *           type: string
 *           description: Description of the kot.
 */
import express, { Request, Response, NextFunction } from 'express';
import profileService from '../service/profile.service';
import { ProfileInput } from '../types';
import { profile } from 'console';

const profileRouter = express.Router();

/**
 * @swagger
 * /profiles:
 *  get:
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

profileRouter.post('/create', async (req: Request, res: Response) => {
    try {
        if (!req.body.user) {
            return res.status(400).json({
                status: 'error',
                errorMessage: 'Missing profile data in request body',
            });
        }
        const profile: ProfileInput = req.body.profile;
        const email: string = req.body.string;
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
