import React, {useEffect, useState, memo} from 'react';
import { getData } from '../../Service/chartService';

function SingleValue(props) {
  const {width, filter, option, signal} = props;
  const [dataChart, setDataChart] = useState(null);
  useEffect(()=>{
    async function fetchDate(){
      try{
        const resData = await getData(option.type, option.isMul, option.func, option.xAxis, option.yAxis, option.labelCol, filter);
        setDataChart(resData.value);
      }catch(error){
        console.log(error);
      }
    }
    fetchDate();
  },[signal]);
  return (
    <div className='text-3xl font-bold text-center text-dark-blue' style={{width: width - 20, height:'35px'}}>{dataChart}</div>
  )
}

export default memo(SingleValue)