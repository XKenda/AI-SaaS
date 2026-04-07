import axios from "axios";
import { LOCAL_URL } from "../config/env";


export const api = axios.create({
    baseURL: `${LOCAL_URL}/api/v1`,
    withCredentials: true,
});