import express from 'express'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";
import ConnectToDB from './config/db.js';
import userRouter from './modules/user/user.routes.js';
import jobRouter from './modules/job/job.routes.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import cvRouter from './modules/cv/cv.routes.js';

var app = express();

app.use(cors({
    origin: "https://ai-saas-omega-ten.vercel.app",
    credentials: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/user', userRouter)
app.use('/api/v1/job', jobRouter)
app.use('/api/v1/cv', cvRouter);

app.use(errorHandler)

ConnectToDB()

export default app;