import { model, Schema } from "mongoose";
import validator from "validator"

const userSchema = new Schema({
    profileImgUrl: {
        type: String,
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        minLength: 4,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        validate: (em)=>{
            if(!validator.isEmail(em))
                throw new Error("You must enter a valid email")
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 8,
    },
    age: {
        type: Number,
        default: 18
    },
    title: {
        type: String,
        minLength: 10
    },
    employed: {
        type: Boolean,
    }
}, {timestamps: true})

const User = model('user', userSchema)

export default User;