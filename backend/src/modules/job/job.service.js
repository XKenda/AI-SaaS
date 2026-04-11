import Job from "./job.model.js"


export const addJobService = async (userId, data) => {
    try {
        const job = await Job.create({...data, userId})
        return job
    } catch (e) {
        throw new Error(e.message)
    }
}

export const getAllJobService = async (userId, query) => {
    switch (query) {
        case "oldest":
            query = {$sort: { createdAt: 1}};
            break;
        case "newest":
            query = {$sort: {createdAt: -1}};
            break;
        case "a-z":
            query = {$sort: {position: 1}};
            break;
        case "z-a":
            query = {$sort: {position: -1}};
            break;
    
        default:
            break;
    }
    try {

        const allJobs = await Job.aggregate([{$match: {userId}}, query])

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

export const deleteJobService = async (userId, jobId) => {
    try {
        const jobDeleted = await Job.findOneAndDelete({_id: jobId, userId}, {returnDocument: "after"});
        return jobDeleted;
    } catch (e) {
        throw new Error(e)
    }
}