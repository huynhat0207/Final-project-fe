import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Dialog, InputLabel} from '@mui/material';
import ResponsiveReactGridLayout  from "react-grid-layout";
import SummarizeIcon from '@mui/icons-material/Summarize';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import GetAppIcon from '@mui/icons-material/GetApp';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MainContainer from '../Chart/MainContainer';
import FormDialog from '../Chart/FormDialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import {IconButton} from '@mui/material';
import { getMappingFields } from '../Service/dataService';
import { keysApi } from './keysDefine';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { SingleValueApi } from '../Service/chartService';
import TextField from '@mui/material/TextField';
import FileNotFound from './FileNotFound';
import MiniChatbot from './MiniChatbot';
import NavButton from './NavButton';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FilterDialog = (props) => {
  const {columns, openDialog, setOpenDialog, cur, setCur, filterColumns, setFilterColumns} = props;
  const getUnique = async (value) => {
    const res = await SingleValueApi('unique', value);
    return res.value;
  }
  const getRange = async (value) => {
    const res1 = await SingleValueApi('min', value);
    const res2 = await SingleValueApi('max', value);
    return {min: res1.value, max: res2.value};
  }
  async function addFilterList(){
    var res;
    if (!filterColumns.includes(cur)){
      if (keysApi[cur] === 'include'){
        res = await getUnique(cur);
        setFilterColumns(filterColumns => [...filterColumns, {'column': cur, 'type': keysApi[cur], 'values':res , 'defaultValues': res}]);
      }
      else{
        res = await getRange(cur)
        setFilterColumns(filterColumns => [...filterColumns, {'column': cur, 'type': keysApi[cur],'from_to': [res.min, res.max], 'min': res.min, 'max': res.max}]);
      }
    }
    setOpenDialog(false);
  }

  function handleCloseDialog(){
    setOpenDialog(false);
  }
  return (
  <Dialog
    onClose={handleCloseDialog}
    open={openDialog}
    scroll="paper"
  >
    <DialogTitle sx={{ m: 0,p:2, paddingRight:8 }} id="customized-dialog-title">
      <h3 className='font-bold text-xl text-dark-blue'>Choose field you want to add filter:</h3>
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
      <FormControl fullWidth sx={{marginTop:"10px"}}>
          <InputLabel id="field">Field</InputLabel>
          <Select
          labelId="field"
          id="field-select"
          label="Field"
          required
          onChange={(e) => {setCur(e.target.value);}}
          >
              {columns.map((item)=> <MenuItem key={item} value={item}> {item} </MenuItem>)}
          </Select>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' sx={{margin:"2px 4px"}} onClick={()=>setOpenDialog(false)}>Close</Button>
      <Button variant='contained' sx={{margin:"2px 4px"}} onClick={addFilterList}>Set</Button>
    </DialogActions>
  </Dialog>)
}

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [signal, setSignal] =useState(false);
  const [cur, setCur] = useState(null);
  const [filterColumns, setFilterColumns] = useState([]);
  const [listOfCharts, setListOfCharts] = useState([]);
  const [columns, setColumns] = useState([]);
  const [props, setProps] = useState(
    {
      layout:[],
    }
  );

  function clearAll(){
    setListOfCharts([]);
    setProps({
      layout:[],
    })
  };
  async function applyFilter(){
    setSignal(!signal);
  }
  const handleChange = (event, index, type) => {
    if (type === 'include'){
      const {
        target: { value },
      } = event;
      setFilterColumns(filterColumns.map((item, idx) => ( idx === index)? {...item, values: value } : item ))
    }
  };
  const handleRangeChange = (event, index, isMin) => {
    const {
      target: { value },
    } = event;
    var ft;
    if (isMin){
      // var temp = filterColumns;
      ft = filterColumns[index].from_to;
      ft[0] = parseInt(value);
      setFilterColumns(filterColumns.map((item, idx) => ( idx === index)? {...item, from_to: ft } : item ))
    }
    else {
      ft = filterColumns[index].from_to;
      ft[1] = parseInt(value);
      setFilterColumns(filterColumns.map((item, idx) => ( idx === index)? {...item, from_to: ft } : item ))
    }
  };
  const handleDateRangeChange = (event, index, isMin) => {
    const {
      target: { value },
    } = event;
    var ft;
    if (isMin){
      // var temp = filterColumns;
      ft = filterColumns[index].from_to;
      ft[0] = value;
      setFilterColumns(filterColumns.map((item, idx) => ( idx === index)? {...item, from_to: ft } : item ))
    }
    else {
      ft = filterColumns[index].from_to;
      ft[1] = value;
      setFilterColumns(filterColumns.map((item, idx) => ( idx === index)? {...item, from_to: ft } : item ))
    }
  };
  useEffect(()=>{
    if (props.layout.length < listOfCharts.length) {
      var index = listOfCharts.length -1;
      var width = listOfCharts[index].width;
      var height = listOfCharts[index].height;
      var newLayout = props.layout;
      newLayout.push({i: String(index), x: 0, y: 0, w: width, h: height})
      setProps({layout:newLayout})
    }
  },[listOfCharts]);
  useEffect(()=>{
    const getFields = async ()=>{
      const data = await getMappingFields().catch((error)=>{
        setOpenWarning(true);
      });
      if (data){
        setColumns(Object.keys(data).map((item) => (data[item])));
      }
      
    }
    getFields();
  },[]);
  // useEffect(()=>{
  //   console.log(props)
  // },[props])
  // useEffect(()=>{
  //   console.log(filterColumns);
  // },[filterColumns])
  // useEffect(()=>{
  //   function fetchJSONData() {
  //     var data = require('./test.json');
  //     console.log(data);
  //     setListOfCharts(data.list)
  //     setLayout(data.layout)
  //   }
  //   fetchJSONData()
  // },[])
  return (
    <div className='mx-32 mt-8 min-h-1000'>
      <div className='flex items-center text-deep-blue'>
        <Link to='../home' ><HomeIcon/></Link>
        <span className='font-bold px-1 font-mono'> &gt; </span>
        <Link to='../dashboard'>
          <h1 className=" font-sans text-xl font-bold ">Dashboard</h1>
        </Link>
        <span className='font-bold px-1 font-mono'> &gt; </span>
      </div>
      <div className='flex text-vivid-blue'>
        <SummarizeIcon sx={{height:"auto", width:"36px"}} />
        <h2 className=" font-sans text-3xl font-bold"> Your Report</h2>
      </div>
      <div className=' flex gap-x-2 mt-2'>
          <Button size='small' variant='contained' onClick={()=>setOpen(true)}> <AddIcon/> Add Visualization</Button> 
          <Button size='small' variant='contained' onClick={()=>clearAll()}> <ClearIcon/> Clear All</Button>
          <Button size='small' variant='contained'> <GetAppIcon/> Export</Button>
          <Button size='small' variant='contained' onClick={()=>setOpenDialog(true)} > <FilterAltIcon/> Add Filter</Button>
          {filterColumns.map((val, index)=> 
            (val.type === 'include')? 
              <FormControl size='small' sx={{ width: 200}}>
                <InputLabel id="demo-multiple-checkbox-label">{val.column}</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={val.values}
                  onChange={(e) => handleChange(e, index, val.type)}
                  // onChange={(e) => setFilter(e.target.value)}
                  input={<OutlinedInput label={val.column} />}
                  renderValue={(selected) => selected.map((x) => x).join(', ')}
                  MenuProps={MenuProps}
                >
                  {val.defaultValues.map((variant) => (
                    <MenuItem key={variant} value={variant}>
                      <Checkbox
                        checked={
                          val.values.findIndex((item) => item === variant) >= 0
                        }
                      />
                      <ListItemText primary={variant} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>: 
            (val.type === 'range')?
              <>
                <TextField size="small" type='number' label='From' sx={{ width: 120}} defaultValue={val.min} inputProps={{ min: val.min, max: val.max }}
                  onChange={(e)=>handleRangeChange(e, index, true)}
                />
                <TextField size="small" type='number' label='To' sx={{ width: 120}} defaultValue={val.max} inputProps={{ min: val.min, max: val.max }}
                onChange={(e)=>handleRangeChange(e, index, false)}
                />
              </>
            :(val.type === 'daterange')?
            <>
              <TextField size="small" type='date' label='From' sx={{ width: 150}} defaultValue={val.min}
                onChange={(e)=>handleDateRangeChange(e, index, true)}
              />
              <TextField size="small" type='date' label='To' sx={{ width: 150}} defaultValue={val.max}
                onChange={(e)=>handleDateRangeChange(e, index, false)}
              />
            </>
            :null
        )}
        {filterColumns.length !==0 && <Button onClick={()=>applyFilter()}>Apply</Button>}
        {filterColumns.length !==0 && <Button onClick={() => {setFilterColumns([]); setSignal(!signal);}}>Remove</Button>}
      </div>
      <div className='relative mt-2'>
        <ResponsiveReactGridLayout  
            rowHeight={100} 
            className="layout"
            cols={12}
            width={1200}
            margin={[0, 0]}
            {...props}
            onLayoutChange={(layout) => {setProps({layout: layout})} }
            measureBeforeMount
          >
            {listOfCharts.map((chart, index) =>{
            return <div key={String(index)}>
              <MainContainer index={index} size={chart.size} width={chart.width} height={chart.height} title={chart.title} type={chart.type} listOfCharts={listOfCharts} setListOfCharts={setListOfCharts} props={props} setProps={setProps} filter={filterColumns} option={chart.option} signal={signal}/>
            </div>}
            )}
          </ResponsiveReactGridLayout>
        </div>
      <FormDialog title="Add Visualization" open={open} setOpen={setOpen} listOfCharts={listOfCharts} setListOfCharts={setListOfCharts} type='add' listCols={columns}/>
      <FilterDialog columns={columns} openDialog={openDialog} setOpenDialog={setOpenDialog} cur={cur} setCur={setCur} filterColumns={filterColumns} setFilterColumns={setFilterColumns}/>
      <FileNotFound open={openWarning} setOpen={setOpenWarning}/>
      <NavButton/>      
    </div>
  )
}

export default Dashboard