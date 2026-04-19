import {v2 as cloudinary} from "cloudinary"

export const deleteFileFromCloudinary = async (public_id) => {
    try {
        await cloudinary.uploader.destroy(public_id)
        return true
    } catch (e) {
        throw e
    }
}