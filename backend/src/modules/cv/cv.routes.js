import express from "express"
import { deleteCVController, getAllCVsController, uploadCVController } from "./cv.controller.js"
import { auth } from "../../middlewares/auth.middleware.js"
import multer from "multer"

const update = multer({ dest: "/uploads" })

const cvRouter = express.Router()

cvRouter.post("/upload", auth, update.single("cv"), uploadCVController)

cvRouter.get('/', auth, getAllCVsController)

cvRouter.delete('/:id', auth, deleteCVController)

export default cvRouter;
