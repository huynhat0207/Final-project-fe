import React, {useState} from "react";
import Plot from 'react-plotly.js'
function BoxPlot() {
  const data = [
    {
      y: [0, 1, 1, 2, 3, 5, 8, 13, 21],
      type: 'box',
    },
  ]
  return (
    <Plot
      data={data}
    />
  )
}
 
export default BoxPlot