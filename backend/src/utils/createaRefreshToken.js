import JWT from "jsonwebtoken";
import { RFRESH_SECRET } from "../config/env.js";

export const createRefreshToken = (data) => {
    try {
        const token = JWT.sign(data, RFRESH_SECRET)

        return token
    } catch (e) {
        throw new Error(e.message)
    }
}