/**
 * @swagger
 *   components:
 *    schemas:
 *      Kot:
 *          type: object
 *          properties:
 *            location:
 *              $ref: '#/components/schemas/Location'
 *              description: The location of the kot.
 *            price:
 *              type: number
 *              description: The price of the kot.
 *            surfaceSpace:
 *              type: number
 *              description: The surface space of the kot in square meters.
 *            profiles:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Profile'
 *              description: List of profiles associated with the kot.
 */
import express, { NextFunction, Request, Response } from 'express';
import kotService from '../service/kot.service';
const kotRouter = express.Router();
/**
 * @swagger
/koten:
 *   get:
 *      security:
 *        - bearerAuth: []
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
 *                      example:
 *                        - location: "Downtown Leuven"
 *                          price: 600
 *                          surfaceSpace: 25
 *                          profiles:
 *                            - username: "John_Doe"
 *                              bio: "Graduate student at KU Leuven"
 *                              role: "User"
 */
kotRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const koten = await kotService.getAllKoten();
        res.status(200).json(koten);
    } catch (err) {
        res.status(400).json({ status: 'error', errorMessage: 'Bad Client Request' });
    }
});

export { kotRouter };
