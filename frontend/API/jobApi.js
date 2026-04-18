import { api } from "./axios.config"


export const getJobs = (query = "a-z") => {
    return api.post('/job/get', {query})
}

export const getJob = (jobId) => {
    return api.get(`/job/${jobId}`)
}

export const addJob = (data) => {
    return api.post('/job/', data)
}

export const updateJobAPI = (jobId, updates) => {
    return api.patch(`/job/${jobId}`, updates)
}

export const deleteJobAPI = (jobId) => {
    return api.delete(`/job/${jobId}`)
}