import { addJobService, getAllJobService, updateJobService } from "./job.service.js"


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
};

export const updateJobContoller = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const {id: jobId} = req.params
        const update = req.body

        console.log(jobId) 
        
        const job = await updateJobService(userId, jobId, update)

        if(!job) return res.status(404).json({success: false});

        res.status(200).json({success: true, data: job})
    } catch (e) {
        next(e)
    }
}