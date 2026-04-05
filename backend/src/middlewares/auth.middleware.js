import jwt from "jsonwebtoken"
import { REFRESH_SECRET } from "../config/env"
import User from "../modules/user/user.model"


export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken

        if(!token) return res.status(401).send('unauthorized')

        const userId = jwt.verify(token, REFRESH_SECRET)

        const user = await User.findOne({_id: userId})

        if(!user) return res.status(401).send("you must create accoutn first")

        req.user = user

        next()

    } catch (e) {
        next(e)
    }
}