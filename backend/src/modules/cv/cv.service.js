import Upload from "../../shared/upload.model.js"
import { deleteFileFromCloudinary } from "../../utils/deleteFileFromCloudinary.js"
import { abortTransaction, commitTransaction, startTransaction } from "../../utils/session.js"
import CV from "./cv.model.js"


export const uploadCVService = async (userId, result) => {
    const session = startTransaction()
    try {
        const cv = await CV.create({userId, cvUrl: result.secure_url}, {session})
        const data = await Upload.create({userId, itemId: cv._id, fileUrl: result.secure_url, publicId: result.public_id, fileType: "pdf"}, {session})

        if(data) {
            await commitTransaction(session)
            return cv
        }

        await abortTransaction(session)
        return false
    } catch (e) {
        await abortTransaction(session)
        throw e
    }
}

export const getAllCVsService = async (userId) => {
    try {
        const cvs = await CV.find({userId});
        return cvs
    } catch (e) {
        throw e
    }
}

export const deleteCVService = async (userId, cvId) => {
    const session = startTransaction();
    try {
        const cv = await CV.findOne({_id: cvId, userId})
        if(!cv) return false

        const deleted = await CV.deleteOne({_id: cvId, userId}, {session});
        const uploaditem = await Upload.findOne({itemId: cvId})
        const deletedFile = await deleteFileFromCloudinary(uploaditem.publicId);
        const deletedUpload = await Upload.deleteOne({itemId: cvId}, {session});

        if(deleted && deletedFile && deletedUpload) {
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