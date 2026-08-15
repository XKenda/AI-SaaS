import { v2 as cloudinary } from "cloudinary";

export const uploadImageToCloudinary = async (file) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            stream.end(file.buffer);
        });

        return result;
    } catch (e) {
        throw new Error(e.message);
    }
};