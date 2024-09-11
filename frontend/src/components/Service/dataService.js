import api from "./apiService";

export const loadData = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/api/data/', formData);
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
        const response = await api.get('api/data/');
        return response.data;
    }
    catch(error){
        var res = error.response;
        console.error('Error loading data:', res.data);
        throw error;
    }
}

export const getColumns = async() =>{
    try {
        const response = await api.get('/api/data/data-column/');
        return response.data;
    }catch(error){
        // console.error('Error when getting the columns\' name:', error);
        throw error;
    }
}

export const getMappingFields = async() => {
    try{
        const response = await api.get('/api/data/mapping/');
        // Return a dictionary
        return response.data.mapping;
    }catch(error){
        // console.error('Error when getting the mapping fields\' name:', error);
        throw error;
    }
}

export const applyMappingFields = async(mapping) => {
    const formData = new FormData();
    formData.append('mapping', JSON.stringify(mapping));
    try{
        const response = await api.post('/api/data/mapping/', formData);
        // Return a dictionary
        return response.data;
    }catch(error){
        // console.error('Error when getting the mapping fields\' name:', error);
        throw error;
    }
}

export const changeMappingFields = async(mapping) => {
    const formData = new FormData();
    formData.append('mapping', mapping);
    try{
        const response = await api.put('/api/data/mapping/', formData);
        // Return a dictionary
        return response.data;
    }catch(error){
        console.error('Error when getting the mapping fields\' name:', error);
        throw error;
    }
}

export const deleteData = async() => {
    try {
        const response = await api.delete('/api/data/');
        return response
    }catch(error){
        console.error('Error when getting the mapping fields\' name:', error);
        throw error;
    }
}