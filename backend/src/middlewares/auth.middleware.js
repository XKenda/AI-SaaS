import jwt from "jsonwebtoken"
import { REFRESH_SECRET } from "../config/env.js"
import User from "../modules/user/user.model.js"
import Token from "../modules/user/token.model.js"


export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;

        if(!token) return res.status(401).send('unauthorized');

        const tokenIsExist = await Token.findOne({token});

        if(!tokenIsExist) {
            res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 15
            });
            return res.status(401).send("Unauthorized");
        }

        const userId = jwt.verify(token, REFRESH_SECRET).userId;

        const user = await User.findOne({_id: userId});

        if(!user) return res.status(401).send("you must create accoutn first");

        req.token = token;
        req.user = user;

        next();

    } catch (e) {
        next(e);
    }
}