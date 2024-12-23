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
import { ProfileInput} from '../types';
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
    } catch (error) {
        next(error);
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
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
});

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
 *                                  - bio
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
profileRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.profile) {
            return res.status(400).json({
                status: 'error',
                errorMessage: 'Missing profile data in request body',
            });
        }
        const profile: ProfileInput = req.body.profile;
        const email: string = req.body.email;
        const createdProfile = await profileService.createProfile(profile, email);

        res.status(200).json({
            message: 'Profile has been created succesfully',
            profile: createdProfile,
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/{username}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete a profile and all affiliated data.
 *      tags:
 *          - Profiles
 *      parameters:
 *          - in: path
 *            name: username
 *            required: true
 *            schema:
 *              type: string
 *            description: The username of the profile that needs to be deleted.
 *      responses:
 *          200:
 *              description: Message and profile that has been deleted.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Profile successfully deleted"
 *                              deletedProfile:
 *                                  $ref: '#/components/schemas/Profile'
 */

profileRouter.delete('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile = await profileService.deleteProfile(String(req.params.username));
        res.status(200).json({
            message: 'Profile succesfuly deleted',
            deletedProfile: profile,
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/moderator/{username}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update a user to be a moderator as an admin.
 *      tags:
 *          - Profiles
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: The username of the profile that needs to be updated.
 *      responses:
 *          200:
 *              description: An updated profile object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profile'
 */
profileRouter.put(
    '/moderator/:username',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const request = req as Request & { auth: { username: string; role: string } };
            const { role } = request.auth;
            const profile = await profileService.makeModerator(String(req.params.username), role);
            res.status(200).json(profile);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /profiles/user/{username}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update a moderator to be a user as an admin.
 *      tags:
 *          - Profiles
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: The username of the profile that needs to be updated.
 *      responses:
 *          200:
 *              description: An updated profile object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profile'
 */
profileRouter.put('/user/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: string } };
        const { role } = request.auth;
        const profile = await profileService.makeUser(String(req.params.username), role);
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
});

export { profileRouter };
