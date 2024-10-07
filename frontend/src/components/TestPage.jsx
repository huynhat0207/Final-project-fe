import React from 'react'
import MainContainer from './Chart/MainContainer'
import Plot from 'react-plotly.js'
import { Card, IconButton, CardHeader } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
function TestPage() {
    var x = ["Apples","Apples","Apples","Oranges", "Bananas"]
    var y = ["5","10","3","10","5"]
  return (
    <Card sx={{width: '600px', height: '400px', margin:"5px",margin:'10px' ,  padding:'10px', background:'white'}}>
          <CardHeader
          title={<h3 className='font-bold text-xl text-dark-blue'>Bar Chart</h3>}
          action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
          }
          sx={{padding:0}}
          />
          <Plot
          data={[
            {
              histfunc: "count",
              y: y,
              x: x,
              type: "histogram",
              name: "count"
            },
            {
              histfunc: "sum",
              y: y,
              x: x,
              type: "histogram",
              name: "sum"
            }
          ]}
          layout ={{
            height: 400 - 65,
            width: 600 - 20,
          }}
          />
      </Card>
  )
}

export default TestPage