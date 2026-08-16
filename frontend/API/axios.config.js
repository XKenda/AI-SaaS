import axios from "axios";
import { LOCAL_URL } from "../config/env";


export const api = axios.create({
    baseURL: `/api/v1`,
    withCredentials: true,
});