import express from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { addJobContoller } from "./job.controller.js";

const jobRouter = express.Router();

jobRouter.post('/', auth, addJobContoller)

export default jobRouter;
