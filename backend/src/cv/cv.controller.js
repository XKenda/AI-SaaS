import { uploadImageToCloudinary } from "../utils/uploadImageToCloudinary"
import { getAllCVsService, uploadCVService } from "./cv.service"


export const uploadCVController = async (req, res, next) => {
    try {
        const userId = req.user._id
        const cvFile = req.file

        const cvUrl = await uploadImageToCloudinary(cvFile)
        const cv = await  uploadCVService(userId, cvUrl)

        if(!cv) return res.status(404).json({success: false, message: "cann't upload cv"})

        res.status(201).json({ success: true, data: cv })
    } catch (e) {
        next(e)
    }
}

export const getAllCVsController = async (req, res, next) => {
    try {
        const userId = req.user._id

        const CVs = await getAllCVsService(userId);

        if(!CVs) return res.status(404).json({success: false , message: "cann't get your resumes please try again later"})
         
        res.status(200).json({success: true, data: CVs})
    } catch (e) {
        next(e)
    }
}