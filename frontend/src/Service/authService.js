import api from "./apiService";

export const loginAuth = async (email, password) => {
    try {
        const res = await api.post('/api/user/token/', { email, password });
        return res;
    } catch (error) {
        throw error;
    } 
}

export const registerAuth = async (name, email, password) => {
    try {
        const res = await api.post('/api/user/create/', {name, email, password });
        return res;
    } catch (error) {
        throw error;
    } 
}