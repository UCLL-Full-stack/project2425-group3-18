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
 *
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
 *                 description: Image URL associated with the post.
 *           description: List of posts made by the user.
 *         koten:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Kot'
 *           description: List of koten associated with the profile.
 *
 *     Kot:
 *       type: object
 *       properties:
 *         location:
 *           type: string
 *           description: The location of the kot.
 *         price:
 *           type: number
 *           description: The price of the kot.
 *         surfaceSpace:
 *           type: number
 *           description: The surface space of the kot in square meters.
 *         profiles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Profile'
 *           description: List of profiles associated with the kot.
 */
import express, { NextFunction, Request, Response } from 'express';
import kotService from "../service/kot.service";

const kotRouter = express.Router();


/**
 * @swagger
 * /koten:
 *  get:
 *      summary: Retrieve a list of koten.
 *      tags:
 *        - Koten
 *      responses:
 *          200:
 *              description: An array of Kot objects.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Kot'
 */
kotRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const koten = await kotService.getAllKoten();
        res.status(200).json(koten);
    } catch (err) {
        res.status(400).json({ status: 'error', errorMessage: "Bad Client Request" });
    }
});

export { kotRouter };
