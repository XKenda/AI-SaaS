import {v2 as cloudinary} from "cloudinary"

export const uploadImageToCloudinary = async (file)=>{
    try {
        const result = await cloudinary.uploader.upload(file.path)

        return result.secure_url
    } catch (e) {
        throw new Error(e.message)
    }
}