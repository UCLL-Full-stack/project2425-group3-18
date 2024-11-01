import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { commentRouter } from './controller/comment.router';
import { kotRouter } from './controller/kot.router';


const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use('/comments', commentRouter);
app.use('/koten', kotRouter);

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(400).json({
        status: 'application error',
        message: err.message || 'An unexpected error occurred',
    });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
