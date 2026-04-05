import bcrypt from "bcryptjs";
import { createRefreshToken } from "../../utils/createaRefreshToken.js";
import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary.js";
import { createNewUser, getUser } from "./user.service.js";
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

        
    } catch (e) {
        next(e)
    }
}