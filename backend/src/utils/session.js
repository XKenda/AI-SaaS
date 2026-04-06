import mongoose, { startSession } from "mongoose"

export const startTransaction = async () => {
    const session = await startSession();
    session.startTransaction();
    return session
}

export const commitTransaction = async (session) => {
    await session.commitTransaction();
    session.endSession
}

export const abortTransaction = async (session) => {
    await session.abortTransaction();
    session.endSession();
}