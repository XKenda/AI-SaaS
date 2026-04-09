import express from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { addJobContoller, 
        deleteJobContoller, 
        getAllJobController, 
        updateJobContoller } from "./job.controller.js";

const jobRouter = express.Router();

jobRouter.post('/', auth, addJobContoller)
jobRouter.get('/', auth, getAllJobController)
jobRouter.patch('/:id', auth, updateJobContoller)
jobRouter.delete('/:id', auth, deleteJobContoller)

export default jobRouter;
