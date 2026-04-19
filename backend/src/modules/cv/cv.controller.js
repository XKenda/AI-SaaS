import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary.js"
import { deleteCVService, getAllCVsService, uploadCVService } from "./cv.service.js"


export const uploadCVController = async (req, res, next) => {
    try {
        const userId = req.user._id
        const cvFile = req.file

        const result = await uploadImageToCloudinary(cvFile)
        const cv = await uploadCVService(userId, result)

        if (!cv) return res.status(404).json({ success: false, message: "cann't upload cv" })

        res.status(201).json({ success: true, data: cv })
    } catch (e) {
        next(e)
    }
}

export const getAllCVsController = async (req, res, next) => {
    try {
        const userId = req.user._id

        const CVs = await getAllCVsService(userId);

        if (!CVs) return res.status(404).json({ success: false, message: "cann't get your resumes please try again later" })

        res.status(200).json({ success: true, data: CVs })
    } catch (e) {
        next(e)
    }
}

export const updateCVController = async (req, res, next) => {
    try {
        const userId = req.user._id
        const {id: cvId} = req.params
        const cvFile = req.file

        const result = await uploadImageToCloudinary(cvFile)
        const cv = await updateCVService(userId, cvId, result)

        if (!cv) return res.status(404).json({ success: false, message: "cann't update cv" })

        res.status(200).json({ success: true, data: cv })
    } catch (e) {
        next(e)
    }
}

export const deleteCVController = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const {id: cvId} = req.params

        const deleted = await deleteCVService(userId, cvId)

        if(!deleted) return res.status(404).json({success: false, message: "cann't delete cv"})

        res.status(200).json({success: true, message: "cv deleted successfully"})
    } catch (e) {
        next(e)
    }
}