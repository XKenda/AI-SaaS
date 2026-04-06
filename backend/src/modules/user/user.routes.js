import express from "express"
import { getUserController, logInController, logoutAllController, logOutController, registerController, updateUserController } from "./user.controller.js";
import multer from "multer";
import { auth } from "../../middlewares/auth.middleware.js";

const update = multer({dest: '/uploads'})

const userRouter = express.Router()

userRouter.post('/register', update.single("image"), registerController)
userRouter.post('/login', logInController)
userRouter.delete('/logout', auth, logOutController);
userRouter.delete('/logoutall', auth, logoutAllController)
userRouter.get('/me', auth, getUserController)
userRouter.patch('/update', auth, updateUserController)

export default userRouter;