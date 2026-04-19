import bcrypt from "bcryptjs"
import Token from "./token.model.js"
import User from "./user.model.js"
import { abortTransaction, commitTransaction, startTransaction } from "../../utils/session.js"
import Upload from "../../shared/upload/upload.model.js"


export const getUser = async (email) => {
    try {

        const user = await User.findOne({ email })

        return user
    } catch (e) {
        throw e
    }
}

export const addTokenToDB = async (refreshToken, userId) => {

    try {
        const token = await Token.create({ token: refreshToken, userId })

        if (!token) return false
        return true
    } catch (e) {
        throw e
    }
}

export const createNewUser = async ({ username, email, age, password, title, employed }, result = "") => {
    const session = startTransaction()
    try {
        const user = await User.create({ profileImgUrl: result.secure_url, username, email, age, password, title, employed }, { session })
        if(result) {
            var data = await Upload.create({ userId: user._id, url: result.secure_url, publicId: result.public_id, fileType: "image" }, { session })
        }

        if (data) {
            await commitTransaction(session)
            return user
        }

        await abortTransaction(session)
        return false
    } catch (e) {
        await abortTransaction(session)
        throw e
    }
}

export const deleteToken = async (token) => {
    try {
        const deletedCount = (await Token.deleteOne({ token })).deletedCount;
        return deletedCount;
    } catch (e) {
        throw e
    }
}

export const deleteAllTokens = async (userId) => {
    try {
        const deletedCount = (await Token.deleteMany({ userId })).deletedCount

        if (deletedCount)
            return true
    } catch (e) {
        throw e
    }
}

export const updateUserService = async (userId, updated) => {
    try {
        const user = await User.findOneAndUpdate({ _id: userId }, updated, {
            returnDocument: "after"
        })

        return user
    } catch (e) {
        throw e
    }
}

export const changePasswordService = async (userId, oldPassword, newPassword) => {
    try {

        const user = await User.findOne({ _id: userId });

        const passwordIsMatch = bcrypt.compare(oldPassword, user.password)

        if (!passwordIsMatch) return false

        user.password = newPassword;
        await user.save()
        return true

    } catch (e) {
        throw e
    }
}

export const deleteUserSevice = async (userId) => {
    const session = await startTransaction()
    try {
        const UserDeleted = await User.findOneAndDelete({ _id: userId }, { session })
        const tokensDeleted = await Token.deleteMany({ userId }, { session })
        const uploadDeleted = await Upload.deleteMany({ userId }, { session })

        if(UserDeleted && tokensDeleted && uploadDeleted) {
            await commitTransaction(session)
            return true
        }

        await abortTransaction(session)
        return false
    } catch (e) {
        await abortTransaction(session)
        throw e
    }
}