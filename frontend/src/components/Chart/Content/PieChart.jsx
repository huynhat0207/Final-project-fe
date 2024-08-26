import React, {useState, useEffect} from "react";
import Plot from 'react-plotly.js'
import { getData } from "../../Service/chartService";
function PieChart(props) {
  const {data, width, height, option} = props;
  const [dataChart, setDataChart] = useState(data);
  useEffect(()=>{
    async function fetchDate(){
      try{
        const resData = await getData(option.type, option.isMul, option.func, option.xAxis, option.yAxis, option.labelCol);
        setDataChart(resData);
      }catch(error){
        console.log(error);
      }
    }
    fetchDate();
  },[]);
  return (
    <div onMouseDown={(e) => e.stopPropagation()}>
    <Plot 
      data={dataChart}
      layout ={{
        height: height - 65,
        width: width - 20,
        grid:{rows: 1, columns: 2}
      }}
    />
    </div>
  )
}

export default PieChart