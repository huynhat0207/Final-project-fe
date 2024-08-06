import React from 'react'
import Plot from 'react-plotly.js'

function BarChart() {
  const data = [
    {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [20, 14, 23],
      type: 'bar',
    }
  ]
  return (
    <Plot
      data={data}
    />
  )
}

export default BarChart