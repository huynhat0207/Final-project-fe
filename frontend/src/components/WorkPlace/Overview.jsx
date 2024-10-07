import React, { useEffect, useState, useRef } from 'react'
import {Link, unstable_usePrompt} from 'react-router-dom';
import {Box, Paper} from '@mui/material/';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import GetBackToTopButton from './GetBackToTopButton';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material/';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material/';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid} from '@mui/x-data-grid';
import { loadData, getData, getMappingFields, deleteData, applyMappingFields, changeMappingFields } from '../../Service/dataService';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {default as SelectReact} from 'react-select'
import {keysDescription, option } from './keysDefine';
import Loading from '../Loading';
import LoadingDialog from '../LoadingDialog'
import NavButton from './NavButton';
import Footer from '../Footer/Footer';
// import Select from 'react-select'
// import Select from '@mui/material/Select';

const ExitDialog = (props)=>{
  const {open, setOpen} = props
  const handleClose = () =>{
    setOpen(false);
  }
  return(
  <Dialog
    open={open}
    onClose={handleClose}
  >
    <DialogTitle>Exit Page</DialogTitle>
    <DialogContent>Are you sure you want to leave? You haven't applied mapping fields yet. If you leave now, the data will be removed.</DialogContent>
    <DialogActions>
      <Button>Cancel</Button>
      <Button>OK</Button>
    </DialogActions>
  </Dialog>)
}


function Overview() {
  // Define state
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isMapping, setIsMapping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMapping, setLoadingMapping] = useState(false);
  const [warning, setWarning] = useState(false);
  const [file, setFile] = useState("");
  const [type, setType] = useState("");
  const [rows, setRows] = useState([]);
  // Define Ref
  const excelFileInputRef = useRef();
  const textFileInputRef = useRef();
  // Funtion
  const handleClose = () => {
    setOpen(false);
  };
  const clearData = () => {
    deleteData();
    setData([]);
    setIsUpload(false);
    localStorage.removeItem("props");
    localStorage.removeItem("list");
  };
  function createData(name, systemField) {
    return { name, systemField};
  };
  function getDescription(name){
    return keysDescription[name];
  };
  function getSelect(val, index){
    setRows(rows.map((row, i) =>
      i === index? {...row, systemField: val.value}:row
    ));
  }
  function handleFileChange(e){
    if (e.target.files.length) {
      setFile(e.target.files[0]);
    }
  }
  function createTestField(){
    if (columns) 
      return columns.map((item)=> (
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
  async function setMapping(){
    var newMapping = {};
    for (var i =0; i < rows.length; i++){
      newMapping[rows[i].name] = rows[i].systemField;
    }
    if (isMapping){
      try {
        setLoadingMapping(true);
        const res = await changeMappingFields(newMapping);
        // console.log(res);
        // setRows(Object.keys(res).map((item) => (createData(item, res[item]))));
        const resData = await getData();
        setData(resData.data);
        setColumns(Object.keys(resData.data[0]))
        // setData(resData.results);
        // setColumns(Object.keys(resData.results[0]))
      }catch(error){
        console.log(error);
      }finally{
        setLoadingMapping(false);
      }
    }
    else{
      setLoadingMapping(true);
      try{
        const res = await applyMappingFields(newMapping);
        // console.log(res);
        // setRows(Object.keys(res).map((item) => (createData(item, res[item]))));
        const resData = await getData();
        setData(resData.data);
        setColumns(Object.keys(resData.data[0]))
        // setData(resData.results);
        // setColumns(Object.keys(resData.results[0]))
      }catch(error){
        console.log(error);
      }finally{
        setIsMapping(true);
        setLoadingMapping(false);
      }

    }
  }
  const handleApply = () => {
    setMapping();
  }
  // When upload file
  const initBeforeUnLoad = (isMapping, isUpload) => {
    window.onbeforeunload = (event) => {
      // Show prompt based on state
      if (!isMapping&& isUpload) {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
          e.returnValue = ''
        }
        return "Are you sure you want to leave? You haven\'t applied mapping fields yet. If you leave now, the data will be removed.";
      }
    };
  };
  async function getDataFromFile(){
    try{
    var resData = await getData();
    setData(resData.data);
    setColumns(Object.keys(resData.data[0]))
    // setData(resData.results);
    // setColumns(Object.keys(resData.results[0]))
    setIsUpload(true);
    // if (resData){
    //   var mappingData = await getMappingFields();
    //   setRows(Object.keys(mappingData).map((item) => (createData(item, mappingData[item]))));
    // }
    }
    catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  async function submitFile(){
    setLoading(true);
    var resData = await loadData(file);
    setOpen(false);
    var mappingData = resData.mapping;
    setRows(Object.keys(mappingData).map((item) => (createData(item, mappingData[item]))));
    getDataFromFile()
  }
  useEffect(()=>{
    async function checkFileIsUpload(){
      setLoading(true);
      try{
      var resData = await getData();
      if (resData){
        var mappingData = await getMappingFields();
        setData(resData.data);
        // setData(resData.results);
        setIsUpload(true);
        setIsMapping(true);
        setColumns(Object.keys(resData.data[0]));
        // setColumns(Object.keys(resData.results[0]))
        setRows(Object.keys(mappingData).map((item) => (createData(item, mappingData[item]))));
      }
    }
      catch(error){
        console.log(error);
        if (isUpload) {
          var res = await deleteData();
        }
        setIsMapping(false);
      }finally{
        setLoading(false);
      }
    }
    checkFileIsUpload();
  },[]);
  window.onload = function() {
    initBeforeUnLoad(isMapping, isUpload);
  };
  useEffect(() => {
    initBeforeUnLoad(isMapping, isUpload);
  }, [isMapping, isUpload]);
  // unstable_usePrompt({
  //   message: "Are you sure you want to leave? You haven't applied mapping fields yet. If you leave now, the data will be removed.",
  //   when: ({ currentLocation, nextLocation }) =>
  //     isMapping ===false && isUpload === true &&
  //     currentLocation.pathname !== nextLocation.pathname,
  // });
  return (
    <div className='mx-32 mt-8 min-h-1000 flex flex-col'>
      <div className='flex items-center text-deep-blue'>
        <Link to='../home' ><HomeIcon/></Link>
        <span className='font-bold px-1 font-mono'> &gt; </span>
        <Link to='../overview'>
          <h1 className=" font-sans text-xl font-bold ">Overview</h1>
        </Link>
        <span className='font-bold px-1 font-mono'> &gt; </span>
      </div>  
      <div className='flex text-vivid-blue'>
        <PreviewIcon sx={{height:"auto", width:"36px"}} />
        <h2 className=" font-sans text-3xl font-bold"> Data Review</h2>
      </div>

      {loading? <Loading title="Loading"/> 
        :!isUpload?  
        <Box sx={{display: "flex", flexDirection: "column", border:"1px solid", borderStyle:"dotted", margin: "16px 0px", width:"80vw", height:"500px", alignItems:"center", justifyContent:"center", background:"white"}}>
          <div className="text-xl">Add your data in here</div>
          <div className="text-xl">Once loaded, your data will appear in this section.</div>
          <div className='w-80 p-8 flex flex-col items-center border-2 border-dashed border-logo-color rounded-sm mt-2'>
            <FileUploadOutlinedIcon fontSize="large" sx={{color:"#38bdf8", fontSize: 80}}/>
            <button className='text-white bg-logo-color rounded-2xl py-1 px-4' onClick={()=>{setOpen(true)}} >Browser</button>
            <span>File supported .xlsx, .xls, .csv</span>
          </div>
          <Dialog
          onClose={handleClose}
          open={open}
          fullWidth
          maxWidth="xs"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Upload
            </DialogTitle>
            <DialogContent>
              <FormControl fullWidth sx={{marginTop:1}} >
                <InputLabel id='type-select-label'>Input File Type</InputLabel>
                <Select
                value={type}
                labelId="type-select-label"
                id="type-select"
                label="Input File Type"
                onChange={(e)=>{setType(e.target.value)}}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="csv">Csv</MenuItem>
                  <MenuItem value="excel">Excel</MenuItem>
                </Select>
              </FormControl>
              
            </DialogContent>
            <DialogContent>
            {type==='excel' && <input type='file' ref={excelFileInputRef} onChange={handleFileChange} accept='application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'/>}
            {type==='csv' && <input type='file' ref={textFileInputRef} onChange={handleFileChange} accept='text/csv'/>}
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={submitFile} variant='outlined'>
              Upload
            </Button>
          </DialogActions>
          </Dialog>
        </Box>
        :<div className='h-500 w-full my-2 mx-0 flex flex-col'>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={clearData}>Clear Data</Button>
              {/* <Button variant="contained">Calculate</Button> */}
            </Stack>
            <DataGrid
              rows={data}
              columns={createTestField()}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 50, 100]}
              checkboxSelection
              getRowId={(row)=> generateRandom()} /// Fix when add api
              // slots={{ toolbar: GridToolbar }}
              sx={{
                marginTop: 1, 
                border:1, 
                borderColor:'#38bdf8', 
                color:'#0D2A41',
                '& .MuiDataGrid-cell:hover': {color: '#002B9A',}
              }}
            />
          </div>
      }

      <div className="flex text-vivid-blue">
        <EditIcon sx={{height:"auto", width:"36px"}} />
        <h2 className=" font-sans text-3xl font-bold">Setting Fields</h2>
      </div>
      {loading?
      <Loading title="Loading"/>
      :isUpload?
      <>
      <TableContainer component={Paper} sx={{margin:"10px 0px", maxWidth:1000, overflow:"visible"}} >
        <Table sx={{ minWidth: 650, maxWidth: 1000}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Data Field</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>System Field</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{'&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{getDescription(row.systemField)}</TableCell>
                <TableCell><SelectReact 
                defaultValue={{value: row.systemField, label: row.systemField}}
                onChange={(value) => getSelect(value, index)}
                options={option}
                />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button variant='contained' onClick={handleApply} >Apply</Button>
      </div>
      </>
      :<Loading title="I'm waiting for your data"/>
      }
      <LoadingDialog open={loadingMapping} message="Waiting us for applying your setting..."/>
      <NavButton/>
      {/* <ExitDialog open={warning} setOpen={setWarning}/> */}
      <div className='items-end mt-auto'>
        <Footer/>
      </div>
    </div>
  )
}

export default Overview