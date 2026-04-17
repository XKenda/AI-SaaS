import { api } from "./axios.config"


export const getJobs = (query = "a-z") => {
    return api.post('/job/get', {query})
}

export const addJob = (data) => {
    return api.post('/job/', data)
}

export const updateJob = (jobId, updates) => {
    return api.patch(`/job/${jobId}`, updates)
}

export const deleteJob = (jobId) => {
    return api.delete(`/job/${jobId}`)
}