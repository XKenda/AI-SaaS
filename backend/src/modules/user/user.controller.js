import bcrypt from "bcryptjs";
import { createRefreshToken } from "../../utils/createaRefreshToken.js";
import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary.js";
import { addTokenToDB, createNewUser, deleteAllTokens, deleteToken, getUser } from "./user.service.js";
import bcryptjs from "bcryptjs";

export const registerController = async (req, res, next) => {
    try {
        let fileUrl;
        const file = req.file
        const {username,
                email,
                age,
                password,
                title,
                employed} = req.body

        if(file) {
            fileUrl = await uploadImageToCloudinary(file);
        }
        const emailIsExist = await getUser(email);

        if(emailIsExist) return res.status(404).json({success: false, message: "email is already taken"})

        const hashedPassword = await bcrypt.hash(password, 8)

        const created = await createNewUser({ fileUrl, 
                                        username, 
                                        email, 
                                        age, 
                                        password: hashedPassword, 
                                        title, 
                                        employed})
        if(created) return res.status(200).json({success: true})
        
        res.status(404).json({success: false})
    } catch (e) {
        next(e)
    }
}

export const logInController = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const user = await getUser(email)

        if(!user) return res.status(404).json({message: 'Email not found'})

        const passwordIsMatch = await bcryptjs.compare(password, user.password)

        if(!passwordIsMatch) return res.status(401).json({success:false, message: 'Email or password is incorrect'});

        const token = createRefreshToken({userId : user._id})

        await addTokenToDB(token, user._id)

        res.cookie('refreshToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 15
        })
        res.status(200).json({success: true})
    } catch (e) {
        next(e)
    }
}

export const logOutController = async (req, res, next) => {
    try {
        const token = req.token;

        const deletedCount = await deleteToken(token)

        if(!deletedCount) {
            res.status(404).json({success: false})
        }
    
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 15
        })
        res.status(200).json({success: true})
    } catch (e) {
        next(e)
    }
}

export const logoutAllController = async (req, res, next) => {
    try {
        const user = req.user

        const deleteded = deleteAllTokens(user._id)

        if(deleteded)
            res.status(404).json({success: false})

        res.status(200).json({success: true})
    } catch (e) {
        next(e)
    }
}

export const getUserController = (req, res, next)=>{
    try {
        
        const  {profileImgUrl, username, email, age, employed, title} = req.user

        res.status(200).json({success: true, data: {profileImgUrl, username, email, age, employed, title}})
    } catch (e) {
        next(e)
    }
}