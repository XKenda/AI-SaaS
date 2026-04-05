import User from "./user.model.js"


export const getUser = async (email) => {
    try {
        const user = await User.findOne({email})

        return user
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