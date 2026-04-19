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
    },
    aiOverview: {
        type: String,
        default: ""
    },
    cvRate: {
        type: Number,
        default: 0
    },
    skills: {
        type: [
            {
                type: String, 
                required: true
            }
        ],
        default: []
    },
    weaknesses: {
        type: String,
        default: "",
    },
    improvenesses: {
        type: String,
        default: "",
    },
    
})

const CV = mongoose.model("CV", cvSchema)

export default CV