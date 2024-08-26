import api from "./apiService";

export const getData = async (type, isMul = null, func = null, xAxis, yAxis, labelCol = null) =>{
    if (type === 'line') {
        if (isMul ==='true'){
            const res = await LineChartApi(func, xAxis, yAxis, labelCol)
            var newData = res.data.map((item) => ({...item, mode:'lines'}))
            return newData
        }
        else {
            const res = await LineChartApi(func, xAxis, yAxis)
            const newData = res.data.map((item) => ({...item, mode:'lines'}))
            return newData
        }
    }
    if (type === 'box') {
        const res = await BoxPlotApi(yAxis, xAxis)
        const newData = res.data.map((item) => ({...item, type: 'box',}))
        return newData
    }
    if (type === 'bar') {
        if (isMul === 'true') {
            const res = await BarChartApi(func, xAxis, yAxis, labelCol)
            const newData = res.data.map((item) => ({...item, type: 'bar',}))
            return newData
        }
        else {
            const res = await BarChartApi(func, xAxis, yAxis, labelCol)
            const newData = res.data.map((item) => ({...item, type: 'bar',}))
            return newData
        }
    }
    if (type === 'histogram'){
        const res = await HistogramApi(xAxis);
        // console.log(res.data)
        const newData = [{x:res.data, type:'histogram',}]
        return newData
    }
    if (type === 'pie'){
        const res = await PieChartApi(func, xAxis, yAxis);
        // const newData = []
        const newData = [{...res, type: 'pie',}]
        return newData
        // console.log(res.data)
    }
    if (type === 'value'){
        const res = await SingleValueApi(func, xAxis);
        // const newData = []
        return res
        // console.log(res.data)
    }
}


export const LineChartApi = async (func, x, y, column = null ) => {
    // const {func, x, y, column} = props
    try {
        if (column === null) {
            const response = await api.get('/api/chart/linechart/', {params: {function: func, x: x, y: y}})
            return response.data;
        }
        else {
            const response = await api.get('/api/chart/linechart/', {params: {function: func, x: x, y: y, column:column}})
            return response.data;
        };
    } catch(error){
        console.error('Error loading line chart data:', error);
        throw error;
    }
}

export const BarChartApi = async (func, x, y, column = null) => {
    // const {func, x, y, column} = props
    try {
        if (column === null) {
            const response = await api.get('/api/chart/barchart/', {params: {function: func, x: x, y: y}})
            return response.data;
        }
        else {
            const response = await api.get('/api/chart/barchart/', {params: {function: func, x: x, y: y, column:column}})
            return response.data;
        };
    } catch(error){
        console.error('Error loading bar chart data:', error);
        throw error;
    }
}

export const HistogramApi = async (column) => {
    try {
        const response = await api.get('/api/chart/histplot/', {params: {column:column}})
        return response.data;
    } catch(error){
        console.error('Error loading histogram plot data:', error);
        throw error;
    }
}

export const BoxPlotApi = async (value, label) => {
    try {
        console.log(value, label)
        const response = await api.get('/api/chart/boxplot/', {params: {y:value, x:label}})
        return response.data;
    } catch(error){
        console.error('Error loading box plot data:', error);
        throw error;
    }
}

export const PieChartApi = async (func, label, value) => {
    // const {func, x, y, column} = props
    try {
        const response = await api.get('/api/chart/piechart/', {params: {labels: label, values: value, function: func}})
        return response.data;
    } catch(error){
        console.error('Error loading histogram plot data:', error);
        throw error;
    }
}

export const SingleValueApi = async (func, value) => {
    // const {func, x, y, column} = props
    try {
        const response = await api.get('/api/chart/value/', {params: {function: func, column: value}})
        return response.data;
    } catch(error){
        console.error('Error loading histogram plot data:', error);
        throw error;
    }
}