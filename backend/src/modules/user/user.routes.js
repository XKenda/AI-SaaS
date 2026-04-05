import express from "express"
import { logInController, logOutController, registerController } from "./user.controller.js";
import multer from "multer";
import { auth } from "../../middlewares/auth.middleware.js";

const update = multer({dest: '/uploads'})

const userRouter = express.Router()

userRouter.post('/register', update.single("image"), registerController)
userRouter.post('/login', logInController)
userRouter.delete('/logout', auth, logOutController)

export default userRouter;