import express from "express"
import { logInController } from "./user.controller.js";

const userRouter = express.Router()

userRouter.post('/login', logInController)

export default userRouter;