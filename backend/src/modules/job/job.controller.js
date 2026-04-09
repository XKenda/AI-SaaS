import { addJobService, getAllJobService } from "./job.service.js"


export const addJobContoller = async (req, res, next) => {
    try {
        const userId = req.user._id
        const data = req.body

        const newJob = await addJobService(userId, data)

        if(!newJob) return res.status(404).json({success: false}) 

        res.status(200).json({success: true, data: newJob})
    } catch (e) {
        next(e)
    }
}

export const getAllJobController = async (req, res, next) => {
    try {
        const userId = req.user._id

        const allJobs = await getAllJobService(userId);

        if(!allJobs) return res.status(404).json({success: false})

        res.status(200).json({success: true, count: allJobs.length, data: allJobs})
    } catch (e) {
        next(e)
    }
}