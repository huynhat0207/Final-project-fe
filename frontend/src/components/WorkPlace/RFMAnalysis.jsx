import {React, useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
// import SummarizeIcon from '@mui/icons-material/Summarize';
import { Grid, Stack } from '@mui/material';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
// import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AssessmentIcon from '@mui/icons-material/Assessment';
// import CircularProgress from '@mui/material/CircularProgress';
// import { getColumns } from '../Service/dataService';
import { getColumns } from '../../Service/dataService';
import { rfmAnalysis } from '../../Service/analysisService';
import MenuItem from '@mui/material/MenuItem';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import Loading from '../Loading';
import FileNotFound from './FileNotFound';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SquareIcon from '@mui/icons-material/Square';
import { rfmClassification } from './keysDefine';
import ListSubheader from '@mui/material/ListSubheader';
import { exportComponentAsPNG } from 'react-component-export-image';
import NavButton from './NavButton';
import Footer from '../Footer/Footer';
const RFMChart = (props) => {
  const {exportPNG, total, counts} = props;
  function getValue(val){
    if (counts[val] !== undefined){
      // console.log(counts[val]);
      return counts[val];
    }
    // console.log('False');
    return 0;
  }
  function getPercentage(val){
    if (counts[val] !== undefined){
      return Math.round(counts[val]/total*100);
    }
    return 0;
  }
  function getColor(index){
    return rfmClassification[index].color;
  }
  return(<>
  <div className='flex flex-row pt-4 pl-20' ref={exportPNG}>
    <div className='grid grid-cols-custom w-560'>
      <div className='flex flex-row max-w-20'>
        <div className='flex flex-col h-auto w-5 justify-center items-center' style={{ transform:' rotate(-90deg)'}}>
          <div className='text-xl font-bold text-nowrap' > {"(Frequency + Monetary) / 2"}</div>
        </div>
        
        <div className='flex flex-col pl-2'>
          {[1,2,3,4,5].map((val) => <div key={val} className='text-3xl font-bold w-8 h-12 flex-1'>{val}</div>)}
        </div>
      </div>

      <div className='grid grid-rows-5 grid-cols-5 gap-1 w-400 h-400 float-right'>
        <div className='col-span-2 bg-red pl-2' style={{backgroundColor: getColor(8)}}>
          <span className='text-3xl font-bold'>{getPercentage("Can't Lose Them")}%</span><br/>
          <span className='font-bold'>{getValue("Can't Lose Them")}</span>
        </div>
        <div className='col-span-2 row-span-2 bg-red pl-2' style={{backgroundColor: getColor(1)}}>
          <span className='text-3xl font-bold'>{getPercentage("Loyal Customers")}%</span><br/>
          <span className='font-bold'>{getValue("Loyal Customers")}</span>
        </div>
        <div className='row-span-2 bg-red pl-2' style={{backgroundColor: getColor(0)}}>
          <span className='text-3xl font-bold'>{getPercentage("Champions")}%</span><br/>
          <span className='font-bold'>{getValue("Champions")}</span>
        </div>
        <div className='col-span-2 row-span-2 bg-red pl-2' style={{backgroundColor: getColor(7)}}>
          <span className='text-3xl font-bold'>{getPercentage("At Risk")}%</span><br/>
          <span className='font-bold'>{getValue("At Risk")}</span>
        </div>
        <div className='bg-red pl-2' style={{backgroundColor: getColor(6)}}>
          <span className='text-3xl font-bold'>{getPercentage("About To Sleep")}%</span><br/>
          <span className='font-bold'>{getValue("About To Sleep")}</span>
        </div>
        <div className='col-span-2 row-span-2 bg-red pl-2' style={{backgroundColor: getColor(2)}}>
          <span className='text-3xl font-bold'>{getPercentage("Potential Loyalist")}%</span><br/>
          <span className='font-bold'>{getValue("Potential Loyalist")}</span>
        </div>
        <div className='col-span-2 row-span-2 bg-red pl-2' style={{backgroundColor: getColor(9)}}>
          <span className='text-3xl font-bold'>{getPercentage("Hibernating")}%</span><br/>
          <span className='font-bold'>{getValue("Hibernating")}</span>
        </div>
        <div className='row-span-2 bg-red pl-2' style={{backgroundColor: getColor(5)}}>
          <span className='text-3xl font-bold'>{getPercentage("Need Attention")}%</span><br/>
          <span className='font-bold'>{getValue("Need Attention")}</span>
        </div>
          <div className='bg-red pl-2' style={{backgroundColor: getColor(4)}}>
          <span className='text-3xl font-bold'>{getPercentage("Promising")}%</span><br/>
          <span className='font-bold'>{getValue("Promising")}</span>
        </div>
        <div className='bg-red pl-2' style={{backgroundColor: getColor(3)}}>
          <span className='text-3xl font-bold'>{getPercentage("New Customers")}%</span><br/>
          <span className='font-bold'>{getValue("New Customers")}</span>
        </div>
      </div>
        <div/> {/* NULL */}
      <div>
      <div className='flex flex-row'>
          {[1,2,3,4,5].map((val) => <div key={val} className='text-3xl font-bold w-8 h-8 flex-1 text-center'>{val}</div>)}
        </div>
      </div>
        <div/>{/* NULL */}
      <div className='text-xl font-bold text-center'> Recency</div>
    </div>
    <div className='flex flex-col w-auto'>
      <div className='text-6xl font-bold font-sans'> {total} <span className='text-xl font-normal'>Total Customers</span></div>
      <List
      sx={{width: '100%'}}
      component="nav"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{backgroundColor:'inherit', textAlign:'end'}} >
          Number of customers
        </ListSubheader>
      }
      >
        {rfmClassification.map((val) => 
          <ListItemButton sx={{ height: 30 }} key={val.name}>
            <ListItem>
              <ListItemIcon>
                {/* <div className='' style={{background}}></div> */}
                <SquareIcon sx={{color: val.color, backgroundColor: val.color , width:'18px', height:'18px'}}/>
                </ListItemIcon>
              <ListItemText primary={val.name} />
              <ListItemText secondary={getValue(val.name)} sx={{paddingLeft:10, textAlign:'end'}}/>
            </ListItem>
          </ListItemButton>
        )}
      </List>
    </div>
  </div>

  </>
)
}

function RFMAnalysis() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [columns, setColumns] = useState([]); 
  const [recency, setRecency] = useState(null);
  const [id, setId] = useState(null);
  const [monetary, setMonetary] = useState(null);
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const exportPNG = useRef();

  async function handleApply(){
    setLoading(true);
    try {
      var rfmData = await rfmAnalysis(recency, monetary, id);
      if (rfmData){
        setData(rfmData);
        setLoading(false);
        setIsApply(true);
      }
    }catch(error){
      console.log(error);
    }
    
  }
  function exportToPNG(){
    exportComponentAsPNG(exportPNG);
  }
  function createTestField(){
    if (data)
      return Object.keys(data.data[0]).map((item)=> (
    {
      field: item, 
      headerName:item, 
      width: 130,
      renderHeader: (item) => (
        <strong className='text-dark-blue'>
          {item.field}
        </strong>
      ),
    }
  ));
    return [];
  }
  function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  useEffect(()=>{
    async function getCols() {
      try{
        var cols = await getColumns();
        if(cols.columns){
          setColumns(cols.columns);
        }
      }catch(error){
        setOpen(true);
      }
    }
    getCols();
  },[]);
  // useEffect(()=>{
  //   console.log(data);
  //   if (data.length!=0){
  //     console.log(Object.keys(data.data));
  //   }
  // },[data])
  return (
    <>
    <div className='mx-32 mt-8 min-h-1000 flex flex-col'>
      <div className='flex items-center text-deep-blue'>
        <Link to='../home' ><HomeIcon/></Link>
        <span className='font-bold px-1 font-mono'> &gt; </span>
        <Link to='../dashboard'>
          <h1 className=" font-sans text-xl font-bold ">RFM Analysis</h1>
        </Link>
        <span className='font-bold px-1 font-mono'> &gt; </span>
      </div>
      <div className='flex text-vivid-blue'>
        <AddToPhotosIcon sx={{height:"auto", width:"36px"}} />
        <h2 className=" font-sans text-3xl font-bold"> Select Data</h2>
      </div>
      {!change? 
      <>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col w-500 items-center bg-white p-2'>
            <h1 className='text-4xl font-bold text-vivid-pink'>Instruction</h1>
            <h2 className='text-lg text-center text-deep-blue pt-1'>You can apply without selecting data, the system will automatically use the default columns for <strong className='text-vivid-pink'> Customer Identification, Transaction Date, and Profit</strong>. Alternatively, you can switch to manual mode if the required columns are missing, and you can replace them with other equivalent data columns.</h2>
            <Stack sx={{display:'flex', flexDirection:'row', gap:1, marginTop:2}}>
              <Button variant='contained' onClick={handleApply}>Apply</Button>
              <Button variant='outlined' onClick={()=>setChange(true)}>Switch to Manual</Button>
            </Stack>
          </div>
        </div>
      </>
      :<>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{paddingTop: 2}} >
          <Grid item xs={2} sm={4} md={4} key="recency">
          <div className='bg-white rounded-lg p-1 h-36'>
              <div className="font-bold pl-1">Recency Data: </div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label" >Data</InputLabel>
                      <Select
                      labelId="demo-select-small-label"
                      // id=""
                      value={recency ?? ""}
                      label="DataRecency"
                      onChange={(e) => setRecency(e.target.value)}
                      >
                      {columns.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                      </Select>
                      <FormHelperText>Select the name of the column containing data about recency.</FormHelperText>
              </FormControl>
              </div>
          </Grid>
          <Grid item xs={2} sm={4} md={4} key="monetary">
              <div className='bg-white rounded-lg p-1 h-36'>
              <div className="font-bold pl-1">Monetary Data: </div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label">Data</InputLabel>
                      <Select
                      labelId="demo-select-small-label"
                      // id=""
                      value={monetary ?? ""}
                      label="DataRecency"
                      onChange={(e) => setMonetary(e.target.value)}
                      >
                      {columns.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                      </Select>
                      <FormHelperText>Select the name of the column containing data about monetary.</FormHelperText>
              </FormControl>
              </div>
          </Grid>
          <Grid item xs={2} sm={4} md={4} key="customer">
              <div className='bg-white rounded-lg p-1 h-36'>
              <div className="font-bold pl-1">Customer Index: </div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label">Data</InputLabel>
                      <Select
                      labelId="demo-select-small-label"
                      // id=""
                      value={id ?? ""}
                      label="DataRecency"
                      onChange={(e) => setId(e.target.value)}
                      >
                      {columns.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                      </Select>
                      <FormHelperText>Select the name of the column containing data about customer identity.</FormHelperText>
              </FormControl>
              </div>
          </Grid>
        </Grid>
        <Stack sx={{display:'flex', flexDirection:'row', gap:1, marginTop: 2}}>
          <Button variant='contained' onClick={handleApply}>Apply</Button>
          <Button variant='outlined' onClick={()=>setChange(false)}>Switch to Auto</Button>
        </Stack>
      </>}
      <div className='flex text-vivid-blue mt-2'>
        <AssessmentIcon sx={{height:"auto", width:"36px"}} />
        <h2 className=" font-sans text-3xl font-bold"> Analysis Result</h2>
      </div>

      {isApply?
      <>
      <h2 className=' text-xl font-bold text-deep-blue my-2 border-b-2 border-deep-blue'> 
        <ClearAllOutlinedIcon/> RFM Score Table
      </h2>
      <div className='h-500 w-full my-2 mx-0 flex flex-col'>
        <DataGrid
          rows={data.data}
          columns={createTestField()}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 50, 100]}
          checkboxSelection
          getRowId={(row)=> generateRandom()} /// Fix when add api
          slots={{ toolbar: GridToolbar }}
          sx={{
            marginTop: 1, 
            border:1, 
            borderColor:'#rgb(0 43 154)', 
            color:'#0D2A41',
            '& .MuiDataGrid-cell:hover': {color: 'rgb(13 42 65)',}
          }}
        />
      </div>
      <h2 className=' text-xl font-bold text-deep-blue my-2 border-b-2 border-deep-blue'> 
        <ClearAllOutlinedIcon/>RFM Segments
      </h2>
      <div>
        <Button onClick={exportToPNG} variant='contained' sx={{marginBottom: '4px'}}> 
          <DownloadIcon /> Export As PNG
        </Button>
      </div>
      <RFMChart exportPNG={exportPNG} total={data.total} counts={data.value_counts}/>
      </>
      :loading? <Loading title="Analysing"/>
      :<Loading title="I'm waiting for you to apply"/>
      }
    <div className='items-end mt-auto'>
      <Footer/>
    </div>
  </div>
  <FileNotFound open={open} setOpen={setOpen}/>
  <NavButton/>
  
  </>
  )
}

export default RFMAnalysis