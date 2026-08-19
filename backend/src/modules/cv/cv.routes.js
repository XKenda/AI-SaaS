import express from "express"
import { CvCkeckerController, deleteCVController, getAllCVsController, uploadCVController } from "./cv.controller.js"
import { auth } from "../../middlewares/auth.middleware.js"
import multer from "multer"

const update = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

const cvRouter = express.Router()

cvRouter.post("/upload", auth, update.single("cv"), uploadCVController)
cvRouter.post("/atschecker", auth, update.single("cv"), CvCkeckerController)

cvRouter.get('/', auth, getAllCVsController)

cvRouter.delete('/:id', auth, deleteCVController)


export default cvRouter;
