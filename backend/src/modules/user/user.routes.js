import express from "express"
import { logInController, registerController } from "./user.controller.js";
import multer from "multer";
const update = multer({dest: '/uploads'})

const userRouter = express.Router()

userRouter.post('/register', update.single("image"), registerController)
userRouter.post('/login', logInController)

export default userRouter;