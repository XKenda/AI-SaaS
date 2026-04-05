import Token from "./token.model.js"
import User from "./user.model.js"


export const getUser = async (email) => {
    try {
        const user = await User.findOne({email})

        return user
    } catch (e) {
        throw new Error(e.message)
    }
}

export const addTokenToDB = async (refreshToken, userId) =>{
    try {
        const token = await Token.create({token: refreshToken, userId})

        if(!token) return false
        return true
    } catch (e) {
        throw new Error(e.message)
    }
}

export const createNewUser = async({fileUrl, username, email, age, password, title, employed}) => {
    try {
        const user = await User.create({profileImgUrl: fileUrl, username, email, age, password, title, employed})

        if(user) return true

        return false
    } catch (e) {
        throw new Error(e.message)
    }
}

export const deleteToken = async (token) => {
    try {
        const deletedCount = (await Token.deleteOne({token})).deletedCount;
        return deletedCount;
    } catch (e) {
        throw new Error(e.message)
    }
}

export const deleteAllTokens = async (userId) => {
    try {
        const deletedCount = (await Token.deleteMany({userId})).deletedCount

        if(deletedCount)
            return true
    } catch (e) {
        throw new Error(e.message)
    }
}