import api from "./apiService";

export const forecastData = async(time, metric, filter = null) => {
    try {
        if (filter === null){
            const response = await api.get('/api/data/forecast/', { params: { time: time , metric: metric} });
            return response.data
        }
        else {
            const response = await api.get('/api/data/forecast/', { params: { time: time , metric: metric, filter: JSON.stringify(filter)} });
            return response.data
        }
    }catch(error){
        console.error('Error when forecasting:', error);
        throw error;
    }
}

export const rfmAnalysis = async(time, money, id) => {
    try {
        // const formData = new FormData();
        // formData.append('timestamp', time);
        // formData.append('monetary', money);
        // formData.append('customer', id);
        const response = await api.post('/api/data/rfm/');
        return response.data;
    }
    catch(error){
        console.error('Error when using rfm analysis:', error);
        throw error;
    }
}