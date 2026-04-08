import { api } from "./axios.config"

export const RegisterAPI = (formData) => {
    return api.post('/user/register', formData)
}

export const LogInAPI = (email, password) => {
    return api.post('/user/login', {email, password})
}