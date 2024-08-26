import api from "./apiService";

export const forecastData = async(time, metric) => {
    try {
        const response = await api.get('/api/data/forecast/', { params: { time: time , metric: metric} });
        return response.data
    }catch(error){
        console.error('Error when forecasting:', error);
        throw error;
    }
}