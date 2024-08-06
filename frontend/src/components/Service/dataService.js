import api from "./apiService";

export const loadData = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/api/data/load/', formData);
        console.log(response.data.message);
        console.log(response.data.mapping);
        return response.data;
    } catch(error){
        console.error('Error loading data:', error);
        throw error;
    }

}
export const getData = async (file) => {
    try{
        const response = await api.get('api/data/data/');
        return response.data;
    }
    catch(error){
        console.log('Error getting data:', error);
        throw error
    }
}
export const rfmAnalysis = async(time, money, id) => {
    try {
        const formData = new FormData();
        formData.append('timestamp', time);
        formData.append('monetary', money);
        formData.append('customer', id);
        const response = await api.post('/api/data/rfm/', formData);
        return response.data.data;
    }
    catch(error){
        console.error('Error when using rfm analysis:', error);
        throw error;
    }
}

export const getColumns = async() =>{
    try {
        const response = await api.get('/api/data/data-column/');
        return response.data;
    }catch(error){
        console.error('Error when getting the columns\' name:', error);
        throw error;
    }
}