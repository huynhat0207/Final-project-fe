import api from "./apiService";

export const getChatMessage = async() => {
    try {
        const response = await api.get('/api/chat/', { params: { title: 'default'} });
        return response.data
    }catch(error){
        console.error('Error when get chat messages:', error);
        throw error;
    }
}

export const createNewMessage = async(message) => {
    var bodyData = new FormData();
    bodyData.append('prompt', message);
    try {
        const response = await api.post('/api/chat/', bodyData);
        return response.data
    }catch(error){
        console.error('Error when send chat messages:', error);
        throw error;
    }
}

export const sendMessage = async(message) => {
    var bodyData = new FormData();
    bodyData.append('prompt', message);
    bodyData.append('title', 'default');
    try {
        const response = await api.post('/api/chat/', bodyData);
        return response.data
    }catch(error){
        console.error('Error when send chat messages:', error);
        throw error;
    }
}