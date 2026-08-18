import { config } from "dotenv"

config({ path: `.env.${process.env.NODE_ENV ? 'production' : 'development'}.local` })

export const {
    PORT,
    DB_URL,
    REFRESH_SECRET,
    GEMINI_API_KEY
} = process.env