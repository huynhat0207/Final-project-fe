import React, {useState} from "react";
import Plot from 'react-plotly.js'

function PieChart() {
  const [data, setData] = useState([]);
  return (
    <Plot 
      data={[
        {
          values: [19, 26, 55],
          labels: ['Residential', 'Non-Residential', 'Utility'],
          type: 'pie',
          domain:{
            row:0,
            column:0,
          }
        },
        {
          values: [43, 23, 31],
          labels: ['Test1', 'Test2', 'Test3'],
          type: 'pie',
          domain:{
            row:0,
            column:1,
          }
        }
      ]}
      layout ={{
        height: 400,
        width: 380,
        grid:{rows: 1, columns: 2}
      }}
    />
  )
}

export default PieChart