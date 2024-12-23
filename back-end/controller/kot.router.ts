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
 *      Location:
 *          type: object
 *          properties:
 *            city:
 *              type: string
 *              description: The city/town of the location.
 *            street:
 *              type: string
 *              description: The street of the location.
 *            housenumber:
 *              type: number
 *              description: The housenumber of the location.
 *      KotCreationInput:
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
 *            username:
 *              type: string
 *              description: The username of the profile related to the kot.
 */
import express, { NextFunction, Request, Response } from 'express';
import kotService from '../service/kot.service';
import { KotCreationInput } from '../types';
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
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /koten/{username}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get koten by username.
 *      tags:
 *          - Koten
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: The username of the profile related to the koten.
 *      responses:
 *          200:
 *              description: An array with koten objects
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Kot'
 */
kotRouter.get('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const koten = await kotService.getKotenByUsername(String(req.params.username));
        res.status(200).json(koten);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /koten/create:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Create a new kot.
 *      tags:
 *          - Koten
 *      requestBody:
 *          description: Data required to create a kot.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          kot:
 *                              $ref: '#/components/schemas/KotCreationInput'
 *      responses:
 *          200:
 *              description: The created kot.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Kot'
 */
kotRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const kot: KotCreationInput = req.body.kot;
        const createdKot = await kotService.createKot(kot);
        res.status(200).json({
            message: 'Kot created succesfully',
            kot: createdKot,
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /koten/{kotId}/{username}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Add a profile to a kot.
 *      tags:
 *          - Koten
 *      parameters:
 *          - in: path
 *            name: kotId
 *            required: true
 *            schema:
 *              type: number
 *            description: The id of the kot where the profile needs to be added.
 *          - in: path
 *            name: username
 *            required: true
 *            schema:
 *              type: string
 *            description: The username of the profile that needs to added to the kot.
 *      responses:
 *          200:
 *              description: The kot with it's added users.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Kot'
 */
kotRouter.put('/:kotId/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const kotId = Number(req.params.kotId);
        const username = String(req.params.username);
        const kot = await kotService.addProfileToKot(username, kotId);
        res.status(200).json(kot);
    } catch (error) {
        next(error);
    }
});

export { kotRouter };
