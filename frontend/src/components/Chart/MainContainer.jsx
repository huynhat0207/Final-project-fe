import React from 'react'
import { Card} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton} from '@mui/material';
// import FormDialog from './Dialog/FormDialog';
import SingleValue from './Content/SingleValue';
import LineChart from './Content/LineChart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import BarChart from './Content/BarChart';
import PieChart from './Content/PieChart';
import BoxPlot from './Content/BoxPlot';


// import AddDialog from './Dialog/AddDialog';
function MainContainer(props) {
  // const [open, setOpen] = useState(false);
  const {data, index, width, title, type, listOfCharts, setListOfCharts, layout, setLayout, option} = props;
  const heightTypes ={
    'value': 400,
    'line': 400,
    'area': 400,
    'bar': 400,
    'pie': 400,
  }
  const heightLayoutTypes ={
    'value': 2,
    'line': 4,
    'area': 4,
    'bar': 4,
    'pie': 4,
  }
  const widthTypes ={
    'value': 100,
    'line': 200,
    'area': 200,
    'bar' : 200,
    'pie': 200,
  }
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log('Click');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const DeleteChart = (index) => {
    // var newLayout = layout.filter((val,idx) => val.i !== String(index));
    setLayout(layout.filter((val) => val.i !== String(index)).map((item, idx) => ({...item, i:String(idx)})))
    setListOfCharts(listOfCharts.filter((val, i) => i !== index));
  }
  return (
    <>
      <Card sx={{width: 'auto', height: 'auto', margin:"5px",  padding:'10px', background:'white'}}>
          <CardHeader
          title={<h3 className='font-bold text-xl text-dark-blue'>{title}</h3>}
          action={
              <IconButton aria-label="settings" onClick={(e)=>handleClick(e)} onMouseDown={(e) => e.stopPropagation()}>
                <MoreVertIcon />
              </IconButton>
          }
          sx={{padding:0}}
          />
          {type === 'value'? <SingleValue data={data}  column={option.label} cal={option.cal} />: null}
          {type === 'line'? <LineChart data={data} width={widthTypes[type]*width} height={heightTypes[type]} option={option} />: null}
          {type === 'bar'? <BarChart />: null}
          {type === 'pie'? <PieChart />: null}
          {type === 'box'? <BoxPlot />: null}
      </Card>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>DeleteChart(index)}>Remove</MenuItem>
      </Menu>
    </>
  )
}

export default MainContainer