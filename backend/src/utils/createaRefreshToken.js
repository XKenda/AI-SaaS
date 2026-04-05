import JWT from "jsonwebtoken";
import { REFRESH_SECRET } from "../config/env.js";

export const createRefreshToken = (data) => {
    try {
        const token = JWT.sign(data, REFRESH_SECRET)

        return token
    } catch (e) {
        throw new Error(e.message)
    }
}