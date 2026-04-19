import mongoose from "mongoose";


const uploadSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        enum: ["image", "pdf"],
        required: true
    }
})

const Upload = mongoose.model("Upload", uploadSchema);

export default Upload;