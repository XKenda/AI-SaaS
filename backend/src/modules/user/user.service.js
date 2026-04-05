import User from "./user.model.js"


export const getUser = async (email) => {
    try {
        const user = await User.findOne({email})

        return user
    } catch (e) {
        throw new Error(e.message)
    }
}