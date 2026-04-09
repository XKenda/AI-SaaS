import Job from "./job.model.js"


export const addJobService = async (userId, data) => {
    try {
        const job = await Job.create({...data, userId})
        return job
    } catch (e) {
        throw new Error(e.message)
    }
}