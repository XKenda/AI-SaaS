import Job from "./job.model.js"


export const addJobService = async (userId, data) => {
    try {
        const job = await Job.create({...data, userId})
        return job
    } catch (e) {
        throw new Error(e.message)
    }
}

export const getAllJobService = async (userId) => {
    try {
        const allJobs = await Job.find({userId})

        return allJobs
    } catch (e) {
        throw new Error(e.message)
    }
}

export const updateJobService = async (userId, jobId, update) => {
    try {
        const job = await Job.findOneAndUpdate({_id: jobId, userId}, update, {new: true})

        return job
    } catch (e) {
        throw new Error(e.message)
    }
}