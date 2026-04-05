import mongoose from "mongoose"
import { DB_URL } from "./env.js"


const ConnectToDB = async ()=>{
    try {
        mongoose.connect(DB_URL).then(()=>{
            console.log("mongoDB Connected Successfully")
        })
    } catch (e) {
        console.log(e.message)
    }
}

export default ConnectToDB;