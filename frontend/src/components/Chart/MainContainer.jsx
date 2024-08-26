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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Histogram from './Content/Histogram';
// import AddDialog from './Dialog/AddDialog';

function MainContainer(children) {
  const {data, index, width, title, type, listOfCharts, setListOfCharts, props, setProps, layout, setLayout, option} = children;
  const heightTypes ={
    'value': 400,
    'line': 400,
    'histogram': 400,
    'bar': 400,
    'pie': 400,
    'box' : 400,
  }
  const widthTypes ={
    'value': 100,
    'line': 200,
    'histogram': 200,
    'bar' : 200,
    'pie': 200,
    'box' : 200,
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

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const DeleteChart = (index) => {
    var layouttest = props.layout
    var newLayout = layouttest.filter((val) => val.i !== String(index)).map((item, idx) => ({...item, i:String(idx)}))
    setProps({layout: newLayout});
    // setLayout(layout.filter((val) => val.i !== String(index)).map((item, idx) => ({...item, i:String(idx)})))
    setListOfCharts(listOfCharts.filter((val, i) => i !== index));
  }

  const RenderChart = (props) => {
    const {type, data, option} = props;
    switch (type) {
      case 'value':
        return (<SingleValue data={data}  column={option.label} cal={option.cal} />);
      case 'line':
        return (<LineChart data={data} width={widthTypes[type]*width} height={heightTypes[type]} option={option} />);
      case 'bar':
        return (<BarChart data={data} width={widthTypes[type]*width} height={heightTypes[type]} option={option}/>);
      case 'pie':
        return (<PieChart data={data} width={widthTypes[type]*width} height={heightTypes[type]} option={option}/>);
      case 'box':
        return (<BoxPlot data={data} width={widthTypes[type]*width} height={heightTypes[type]} option={option}/>);
      case 'histogram':
        return (<Histogram data={data} width={widthTypes[type]*width} height={heightTypes[type]} option={option}/>);
      default:
        return null;
    }
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
          <RenderChart type={type} data={data} option={option}/>
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
        <MenuItem onClick={() => DeleteChart(index)}><DeleteOutlineIcon/> Remove</MenuItem>
        <MenuItem onClick={() => setOpenDialog(true)} ><ZoomOutMapIcon/> Windowed</MenuItem>
      </Menu>
      <Dialog
        onClose={handleCloseDialog}
        open={openDialog}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <h3 className='font-bold text-xl text-dark-blue'>{title}</h3>
        </DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            }}
        >
            <CloseIcon />
        </IconButton>
        <DialogContent>
          <RenderChart type={type} data={data} option={option}/>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MainContainer