import React, {useEffect, useState} from 'react';

function SingleValue(props) {
  const {data, width, height, option} = props;
  return (
    <div className='text-3xl font-bold text-center text-dark-blue'>{data.value}</div>
  )
}

export default SingleValue