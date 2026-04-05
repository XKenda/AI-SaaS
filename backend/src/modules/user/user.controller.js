import { createRefreshToken } from "../../utils/createaRefreshToken.js";
import { getUser } from "./user.service.js";
import bcryptjs from "bcryptjs";

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

