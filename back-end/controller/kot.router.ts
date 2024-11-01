import express, { NextFunction, Request, Response } from 'express';
import kotService from "../service/kot.service";

const kotRouter = express.Router();

/**
 * @swagger
 * /koten:
 *  get:
 *      summary: Get all koten.
 *      responses:
 *          200:
 *              description: An array of KOT objects.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Kot'
 */
kotRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const kot = await kotService.getAllKoten();
        res.status(200).json(kot);
    } catch (err) {
        res.status(400).json({status:'error', errorMessage: "Bad Client Request"});
    }
});

export { kotRouter }