import React, { useEffect, useState, useRef } from 'react'
import {Form, Link } from 'react-router-dom';
import {Box, Paper} from '@mui/material/';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import GetBackToTopButton from '../GetBackToTopButton';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material/';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material/';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import Papa from "papaparse";
import { loadData, getData, getMappingFields } from '../Service/dataService';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {default as SelectReact} from 'react-select'
import { Input } from '@mui/material';
import { useTimeout } from '@mui/x-data-grid/internals';
import {keysDescription } from './keysDefine';
import Loading from '../Loading';
// import Select from 'react-select'
// import Select from '@mui/material/Select';

function Overview() {
  const [data, setData] = useState([]);
  const [columns, setColumnTest] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const allowedExtensions = ["csv"];
  // Define state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const [type, setType] = useState("");
  // Sample state
  const [rows, setRows] = useState([
    createData("id", "Transaction ID"),
    createData("date", "Date"),
  ]);
  // Define Ref
  const excelFileInputRef = useRef();
  const textFileInputRef = useRef();
  // Define data
  const option = [
    {value: "Transaction ID", label: "Transaction ID"},
    {value: "Date", label: "Date"},
    {value: "Time", label: "Time"},
    {value: "Customer ID", label: "Customer ID"},
    {value: "Product ID", label: "Product ID"},
    {value: "Product Name", label: "Product Name"},
    {value: "Category", label: "Category"},
    {value: "Quantity", label: "Quantity"},
    {value: "Unit Price", label: "Unit Price"},
    {value: "Total Price", label: "Total Price"},
    {value: "Payment Method", label: "Payment Method"},
    {value: "Store Location", label: "Store Location"},
    {value: "Discount", label: "Discount"},
    {value: "Salesperson ID", label: "Salesperson ID"},
    {value: "Profit Margin", label: "Profit Margin"},
    {value: "Other", label: "Other"},
  ];
  // Funtion
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const clearData = () => {
    setData([]);
    setIsUpload(false);
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
  async function submitFile(){
    setLoading(true);
    var resData = await loadData(file);
    setOpen(false);
    var mappingData = resData.mapping;
    // var cols = Object.keys[mappingData];
    setRows(Object.keys(mappingData).map((item) => (createData(item, mappingData[item]))));
  }
  async function getDataFromFile(){
        try{
        var resData = await getData();
        var mappingData = await getMappingFields();
        setLoading(false)
        setData(resData.data);
        setColumnTest(Object.keys(resData.data[0]))
        setRows(Object.keys(mappingData).map((item) => (createData(item, mappingData[item]))));
        setIsUpload(true);
        }
        catch(error){
          console.log(error);
        }
      }
  useEffect(() => {
    if (file){
      getDataFromFile()
    }
  },[file]);

  // Check file is upload or not? 
  useEffect(()=>{
    async function checkFileIsUpload(){
      setLoading(true);
      try{
      var resData = await getData();
      var mappingData = await getMappingFields();
      setData(resData.data);
      setColumnTest(Object.keys(resData.data[0]));
      setRows(Object.keys(mappingData).map((item) => (createData(item, mappingData[item]))));
      setIsUpload(true);
      setLoading(false);
    }
      catch(error){
        var res = error.response;
        console.log(error);
        if (res.status === 404) {
          setLoading(false);
          setIsUpload(false);
        }
      }
    }
    checkFileIsUpload();
  },[]);
  return (
    <div className='mx-32 mt-8 min-h-1000'>
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
          // Sample table
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
                label="Type"
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
            <Button autoFocus onClick={submitFile}>
              Upload
            </Button>
          </DialogActions>
          </Dialog>
        </Box>
        :<div className='h-500 w-full my-2 mx-0 flex flex-col'>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={clearData}>Clear Data</Button>
              <Button variant="contained">Calculate</Button>
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
              getRowId={(row)=>row[columns[0]]} /// Fix when add api
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
      <Button variant='contained'>Apply</Button>
      </>
      :<Loading title="I'm waiting for your data"/>
      }
      <GetBackToTopButton/>
    </div>
  )
}

export default Overview