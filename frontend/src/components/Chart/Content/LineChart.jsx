import React, {useEffect, useState} from "react";
import Plot from 'react-plotly.js'

function LineChart(props) {
  const {data, width, height, option} = props;
  
  return (
    <Plot
      data={[
        {
          x: ['da', 'asd', 'das', 'ads'],
          y: [10, 15, 13, 17],
          mode:'lines',
        },
        {
          x: ['da', 'asd', 'das', 'ads'],
          y: [16, 5, 11, 9],
          mode:'lines',
        },
      ]}

      layout = {{
        title: 'sdad',
        width: width - 20,
        height: height - 65,
      }}
      // layout={{
      //   width:380, 
      //   height: 330,
      // }}
    />
  );
}
export default LineChart;