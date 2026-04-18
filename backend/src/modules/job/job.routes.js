import express from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { addJobController, 
        deleteJobController, 
        getAllJobController, 
        getJobController, 
        updateJobController } from "./job.controller.js";

const jobRouter = express.Router();

jobRouter.post('/', auth, addJobController) 
jobRouter.post('/get', auth, getAllJobController)
jobRouter.get('/:id', auth, getJobController)
jobRouter.patch('/:id', auth, updateJobController)
jobRouter.delete('/:id', auth, deleteJobController) 

export default jobRouter;
