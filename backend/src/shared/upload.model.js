import mongoose from "mongoose";


const uploadSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
})

const Upload = mongoose.model("Upload", uploadSchema);

export default Upload;