import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { commentRouter } from './controller/comment.router';
import { kotRouter } from './controller/kot.router';
import { postRouter } from './controller/post.router';
import { userRouter } from './controller/user.router';
import { profileRouter } from './controller/profile.router';


const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use('/comments', commentRouter);
app.use('/koten', kotRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter)
app.use('/profiles', profileRouter)

app.use(cors());

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
    apis: ['./controller/*.ts'],
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
