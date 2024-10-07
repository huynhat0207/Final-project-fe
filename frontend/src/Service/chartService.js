import api from "./apiService";

export const getData = async (type, isMul = null, func = null, xAxis, yAxis, labelCol = null, filter) =>{
    var jsonFilter;
    var newData;
    if (type === 'line') {
        if (isMul ==='true'){
            if (filter.length === 0){
                const res = await LineChartApi(func, xAxis, yAxis, [], labelCol)
                newData = res.data.map((item) => ({...item, mode:'lines'}))
                return newData
            }
            else {
                jsonFilter = JSON.stringify(filter)
                const res = await LineChartApi(func, xAxis, yAxis, jsonFilter, labelCol)
                newData = res.data.map((item) => ({...item, mode:'lines'}))
                return newData
            }
            // var newData = res.data.map((item) => ({...item, mode:'lines'}))
            // return newData
        }
        else {
            if (filter.length === 0){
                const res = await LineChartApi(func, xAxis, yAxis, [])
                newData = res.data.map((item) => ({...item, mode:'lines'}))
                return newData
            }
            else {
                jsonFilter = JSON.stringify(filter)
                const res = await LineChartApi(func, xAxis, yAxis, jsonFilter)
                newData = res.data.map((item) => ({...item, mode:'lines'}))
                return newData
            }
        }
    }
    if (type === 'box') {
        if (filter.length === 0){
            const res = await BoxPlotApi(yAxis, xAxis, [])
            const newData = res.data.map((item) => ({...item, type: 'box',}))
            return newData
        }
        else {
            jsonFilter = JSON.stringify(filter)
            const res = await BoxPlotApi(yAxis, xAxis, jsonFilter)
            const newData = res.data.map((item) => ({...item, type: 'box',}))
            return newData
        }
    }
    if (type === 'bar') {
        if (isMul === 'true') {
            if(filter.length === 0){
                const res = await BarChartApi(func, xAxis, yAxis, labelCol, [])
                const newData = res.data.map((item) => ({...item, type: 'bar',}))
                return newData
            }
            jsonFilter = JSON.stringify(filter)
            const res = await BarChartApi(func, xAxis, yAxis, labelCol, jsonFilter)
            const newData = res.data.map((item) => ({...item, type: 'bar',}))
            return newData
        }
        else {
            if (filter.length === 0){
                const res = await BarChartApi(func, xAxis, yAxis, labelCol, [])
                const newData = res.data.map((item) => ({...item, type: 'bar',}))
                return newData
            }
            jsonFilter = JSON.stringify(filter)
            const res = await BarChartApi(func, xAxis, yAxis, labelCol, jsonFilter)
            const newData = res.data.map((item) => ({...item, type: 'bar',}))
            return newData
        }
    }
    if (type === 'histogram'){
        if (filter.length === 0){
            const res = await HistogramApi(xAxis, []);
            const newData = [{x:res.data, type:'histogram',}]
            return newData
        }
        jsonFilter = JSON.stringify(filter)
        const res = await HistogramApi(xAxis, jsonFilter);
        const newData = [{x:res.data, type:'histogram',}]
        return newData
    }
    if (type === 'pie'){
        if (filter.length === 0){
            const res = await PieChartApi(func, xAxis, yAxis, []);
            const newData = [{...res, type: 'pie',}]
            return newData
        }
        jsonFilter = JSON.stringify(filter)
        const res = await PieChartApi(func, xAxis, yAxis, jsonFilter);
        const newData = [{...res, type: 'pie',}]
        return newData
    }
    if (type === 'value'){
        if (filter === 0){
            const res = await SingleValueApi(func, xAxis, []);
            return res
        }
        jsonFilter = JSON.stringify(filter)
        const res = await SingleValueApi(func, xAxis, jsonFilter);
        return res
    }
}


export const LineChartApi = async (func, x, y,  filterValue, column = null) => {
    // const {func, x, y, column} = props
    try {
        if (column === null) {
            const response = await api.get('/api/chart/linechart/', {params: {function: func, x: x, y: y, filter: (filterValue)}})
            return response.data;
        }
        else {
            const response = await api.get('/api/chart/linechart/', {params: {function: func, x: x, y: y, column: column, filter: JSON.stringify(filterValue)}})
            return response.data;
        };
    } catch(error){
        console.error('Error loading line chart data:', error);
        throw error;
    }
}

export const BarChartApi = async (func, x, y, column, filter) => {
    // const {func, x, y, column} = props
    try {
        if (column === null) {
            const response = await api.get('/api/chart/barchart/', {params: {function: func, x: x, y: y, filter: (filter)}})
            return response.data;
        }
        else {
            const response = await api.get('/api/chart/barchart/', {params: {function: func, x: x, y: y, column:column, filter: (filter)}})
            return response.data;
        };
    } catch(error){
        console.error('Error loading bar chart data:', error);
        throw error;
    }
}

export const HistogramApi = async (column, filter) => {
    try {
        const response = await api.get('/api/chart/histplot/', {params: {column:column, filter:(filter)}})
        return response.data;
    } catch(error){
        console.error('Error loading histogram plot data:', error);
        throw error;
    }
}

export const BoxPlotApi = async (value, label, filter) => {
    try {
        // console.log(value, label)
        const response = await api.get('/api/chart/boxplot/', {params: {y:value, x:label, filter: (filter)}})
        return response.data;
    } catch(error){
        console.error('Error loading box plot data:', error);
        throw error;
    }
}

export const PieChartApi = async (func, label, value, filter) => {
    // const {func, x, y, column} = props
    try {
        const response = await api.get('/api/chart/piechart/', {params: {labels: label, values: value, function: func, filter: (filter)}})
        return response.data;
    } catch(error){
        console.error('Error loading histogram plot data:', error);
        throw error;
    }
}

export const SingleValueApi = async (func, value, filter) => {
    // const {func, x, y, column} = props
    try {
        const response = await api.get('/api/chart/value/', {params: {function: func, column: value, filter: (filter)}})
        console.log(response.data)
        return response.data;
    } catch(error){
        console.error('Error loading histogram plot data:', error);
        throw error;
    }
}