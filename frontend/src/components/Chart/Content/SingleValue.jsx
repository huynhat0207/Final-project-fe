import React, {useEffect, useState, memo} from 'react';
import { getData } from '../../Service/chartService';

function SingleValue(props) {
  const {data, width, height, filter, option, signal} = props;
  const [dataChart, setDataChart] = useState(null);
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
    <div className='text-3xl font-bold text-center text-dark-blue'>{dataChart.value}</div>
  )
}

export default memo(SingleValue)