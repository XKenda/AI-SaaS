import { api } from "./axios.config";

export const uploadCVAPI = (formData) => {
    return api.post('/cv/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const getAllCVsAPI = () => {
    return api.get('/cv');
};

export const deleteCVAPI = (id) => {
    return api.delete(`/cv/${id}`);
};
