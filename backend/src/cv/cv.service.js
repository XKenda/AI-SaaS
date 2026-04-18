import CV from "./cv.model"


export const uploadCVService = async (userId, cvUrl) => {
    try {
        const cv = await CV.create({userId, cvUrl})
        return cv
    } catch (error) {
        throw error
    }
}

export const getAllCVsService = async (userId) => {
    try {
        const cvs = await CV.find({userId});
        return cvs
    } catch (e) {
        throw error
    }
}