import React, {useState, useEffect} from "react";
import Plot from 'react-plotly.js'
import { getData } from "../../Service/chartService";

function Histogram(props) {
    const {width, height, filter, option, signal} = props;
    const [dataChart, setDataChart] = useState([]);
    useEffect(()=>{
        async function fetchDate(){
        try{
            const resData = await getData(option.type, option.isMul, option.func, option.xAxis, option.yAxis, option.labelCol, filter);
            setDataChart(resData);
        }catch(error){
            console.log(error);
        }
        }
        fetchDate();
    },[signal]);
    return (
        <div onMouseDown={(e) => e.stopPropagation()}>
            <Plot
                data={dataChart}
                layout = {{
                    width: width - 20,
                    height: height - 65,
                }}
            />
        </div>
    )
}

export default Histogram