import React, {useEffect, useState} from 'react';

function SingleValue(props) {
  const {data, column, cal} = props;
  const [value, setValue] = useState("");
  useEffect(()=>{
    switch(cal){
      case 'count':
        setValue(data.length);
        break;
        case 'sum':
          setValue(data.map((item)=> Math.floor(item[column])).reduce((a,b) => a + b));
          break;
          case 'min':
            setValue(Math.min(...data.map((item)=> Math.floor(item[column]))));
            break;
            case 'max':
              setValue(Math.max(...data.map((item) => Math.floor(item[column]))));
              break;
              case 'mean':
                setValue(data.map((item)=> Math.floor(item[column])).reduce((a,b) => a + b)/ data.length);
                break;
    }  
  },[cal])
  
  return (
    <div className='text-3xl font-bold text-center text-dark-blue'>{value}</div>
  )
}

export default SingleValue