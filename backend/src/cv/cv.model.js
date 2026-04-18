import mongoose from "mongoose"

const cvSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cvUrl: {
        type: String,
        required: true
    }
})

const CV = mongoose.model("CV", cvSchema)

export default CV