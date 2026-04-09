import { model, Schema, Types } from "mongoose";

const jobSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Company name is required'],
        maxLength: 50
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'user is required']
    },
    position: {
        type: String,
        required: true,
        maxLength: 100
    },
    JobType: {
       type: String,
        enum: ['Full-Time', 'Part-Time', 'Contract', 'Freelance'], 
        default: 'Full-Time'
    },
    status: {
        type: String,
        enum: ['pending', 'declined', 'interview', 'offered'],
        default: 'pending'
    },
    location: {
        type: String,
        default: 'My City',
        required: [true, 'location is required']
    },
}, { timestamps: true });

const Job = model('job', jobSchema);

export default Job;
