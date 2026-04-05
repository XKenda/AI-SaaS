import express from 'express'
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import ConnectToDB from './config/db.js';
import userRouter from './modules/user/user.routes.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/user', userRouter)

app.use(errorHandler)

ConnectToDB()

export default app;