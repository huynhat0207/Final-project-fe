import React, { useEffect, memo } from 'react'
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
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import {Grid, TextField, Button} from '@mui/material';
// import AddDialog from './Dialog/AddDialog';
import { useCallback } from 'react';

const RenderChart = (props) => {
  const {width, height, type, filter, option, signal} = props;
  switch (type) {
    case 'value':
      return (<SingleValue width={width*100} height={height*100} filter={filter} option={option} signal={signal} />);
    case 'line':
      return (<LineChart width={width*100} height={height*100} filter={filter} option={option} signal={signal} />);
    case 'bar':
      return (<BarChart width={width*100} height={height*100} filter={filter} option={option} signal={signal}/>);
    case 'pie':
      return (<PieChart width={width*100} height={height*100} filter={filter} option={option} signal={signal}/>);
    case 'box':
      return (<BoxPlot width={width*100} height={height*100} filter={filter} option={option} signal={signal} />);
    case 'histogram':
      return (<Histogram width={width*100} height={height*100} filter={filter} option={option} signal={signal}/>);
    default:
      return null;
  }
}

const WindowedDialog = (props) => {
  const {width, height, title, type, filter, option, signal, openDialog, setOpenDialog} = props;

  const handleCloseDialog = useCallback(() => setOpenDialog(false), []);

  return(
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
        <RenderChart width={width} height={height} type={type} filter={filter} option={option} signal={signal}/>
      </DialogContent>
    </Dialog>)
}

function MainContainer(children) {
  const {index, size, width, height, title, type, listOfCharts, setListOfCharts, props, setProps,filter, option, signal} = children;
  const [w, setW] = React.useState(null);
  const [h, setH] = React.useState(null);
  // const [index, setIndex] = React.useState(null);
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
  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };
  const handleCloseDialog = useCallback(() => setOpenDialog(false), []);
  const [openSizeDialog, setOpenSizeDialog] = React.useState(false);
  const handleCloseSizeDialog = useCallback(() => setOpenSizeDialog(false), []);

  const DeleteChart = (index) => {
    var curLayout = props.layout
    var newLayout = curLayout.filter((val) => val.i !== String(index)).map((item, idx) => ({...item, i:String(idx)}))
    setProps({layout: newLayout});
    // setLayout(layout.filter((val) => val.i !== String(index)).map((item, idx) => ({...item, i:String(idx)})))
    setListOfCharts(listOfCharts.filter((val, i) => i !== index));
  }
  useEffect(()=>{
    console.log('Layout',props);
  },[props]);
  const ChangeSize = (index) => {
    var curLayout = props.layout
    var newLayout = curLayout.map((val) => (val.i === String(index))? {...val, w: parseInt(w), h: parseInt(h) } :val);
    setProps({layout: newLayout});
    setListOfCharts(listOfCharts.map((val, i) => (i === index)? {...val, width: w, height: h} : val))
    setOpenSizeDialog(false);
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
          <RenderChart width={width} height={height} type={type} filter={filter} option={option} signal={signal}/>
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
        <MenuItem onClick={() => {setOpenDialog(true); handleClose()}} ><ZoomOutMapIcon/> Windowed</MenuItem>
        <MenuItem onClick={() => {setOpenSizeDialog(true); handleClose()}} ><AspectRatioOutlinedIcon/> Change Size</MenuItem>
      </Menu>
      {/* <Dialog
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
          <RenderChart type={type} option={option}/>
        </DialogContent>
      </Dialog> */}
      <WindowedDialog width={width} height={height} title={title} type={type} filter={filter} option={option} signal={signal} openDialog={openDialog} setOpenDialog={setOpenDialog}/>

      <Dialog
        onClose={handleCloseSizeDialog}
        open={openSizeDialog}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <h3 className='font-bold text-xl text-dark-blue'>Change size:</h3>
        </DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleCloseSizeDialog}
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
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                  <TextField label="Width" defaultValue={width} value={w} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 12){setW(12)} else if(e.target.value <2){setW(2)} else {setW(e.target.value)}}} type="number" inputProps={{ min: 2, max: 12, step: 1 }}/>
              </Grid>
              <Grid item xs={6}>
                  <TextField label="Height" defaultValue={height} value={h} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 10) {setH(10)} else if (e.target.value <1) {setH(2)} else(setH(e.target.value))}} type="number" inputProps={{ min: 1, max: 10, step: 1 }}/>
              </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>ChangeSize(index)}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(MainContainer)