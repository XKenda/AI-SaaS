import { analyzeCV } from "../../shared/AI/gemini.service.js"
import Upload from "../../shared/upload/upload.model.js"
import { deleteFileFromCloudinary } from "../../utils/deleteFileFromCloudinary.js"
import { abortTransaction, commitTransaction, startTransaction } from "../../utils/session.js"
import CV from "./cv.model.js"


export const uploadCVService = async (userId, result, aiResponse) => {
    const session = await startTransaction()
    try {


        const cv = await CV.create([{ ...aiResponse, userId, cvUrl: result.secure_url }], { session })
        const data = await Upload.create([{ userId, itemId: cv[0]._id, url: result.secure_url, publicId: result.public_id, fileType: "pdf" }], { session })

        if (data) {
            await commitTransaction(session)
            return cv
        }

        await abortTransaction(session)
        return false;
    } catch (e) {
        await abortTransaction(session)
        throw e
    }
}

export const getAllCVsService = async (userId) => {
    try {
        const cvs = await CV.find({ userId });
        return cvs
    } catch (e) {
        throw e
    }
}

export const deleteCVService = async (userId, cvId) => {
    const session = startTransaction();
    try {
        const cv = await CV.findOne({ _id: cvId, userId })
        if (!cv) return false

        // to delete cv
        // 1- delete cv from cv collection
        // 2- delete cv from upload using userId, itemId
        // 3- delete cv from cloudinary using public_id which get it from uploads collection
        const deleted = await CV.deleteOne({ _id: cvId, userId }, { session });
        const uploaditem = await Upload.findOne({ userId, itemId: cvId })
        const deletedFile = await deleteFileFromCloudinary(uploaditem.publicId);
        const deletedUpload = await Upload.deleteOne({userId, itemId: cvId }, { session });

        if (deleted && deletedFile && deletedUpload) {
            await commitTransaction(session)
            return deleted
        }

        await abortTransaction(session)
        return false
    } catch (e) {
        await abortTransaction(session)
        throw e
    }
}