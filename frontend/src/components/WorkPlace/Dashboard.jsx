import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import Papa from "papaparse";
import HomeIcon from '@mui/icons-material/Home';
import { Box, Button} from '@mui/material';
import ResponsiveReactGridLayout  from "react-grid-layout";
import SummarizeIcon from '@mui/icons-material/Summarize';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import GetAppIcon from '@mui/icons-material/GetApp';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';
// import SingleValue from '../Chart/SingleValue';
// import AddDialog from '../Chart/Dialog/AddDialog';
import MainContainer from '../Chart/MainContainer';
import FormDialog from '../Chart/FormDialog';
import { getMappingFields } from '../Service/dataService';

function Dashboard() {
  const [data, setData] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [open, setOpen] = useState(false);
  // const [layout, setLayout] = useState([]);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [listOfCharts, setListOfCharts] = useState([]);
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);
  const allowedExtensions = ["csv"];
  const textFileInputRef = useRef();
  
  const [props, setProps] = useState(
    {
      layout:[],
    }
  );

  const heightLayoutTypes ={
    'value': 1,
    'line': 4,
    'histogram': 4,
    'bar': 4,
    'pie': 4,
    'box' :4,
  }
  const widthTypes ={
    'value': 1,
    'line': 2,
    'histogram': 2,
    'bar' : 2,
    'pie': 2,
    'box': 2,
  }
  useEffect(()=>{
    if (layout.length < listOfCharts.length) {
      var index = listOfCharts.length -1;
      var type = listOfCharts[index].type;
      var width = listOfCharts[index].width;
      var newLayout = props.layout;
      newLayout.push({i: String(index), x: curX, y: curY, w: widthTypes[type]*width, h: heightLayoutTypes[type]})
      setProps({layout:newLayout})
    }
  },[listOfCharts]);

  function clearAll(){
    setListOfCharts([]);
    setProps({
      layout:[],
    })
  };

  const loadLayouts = () => {
    try {
      const savedLayouts = localStorage.getItem('layouts');
      return savedLayouts ? JSON.parse(savedLayouts) : [];
    } catch (err) {
      console.error("Failed to load layouts from localStorage", err);
      return [];
    }
  };  
  const [layout, setLayout] = useState(loadLayouts());
  
  useEffect(()=>{
    const getFields = async ()=>{
      const data = await getMappingFields();
      console.log(data);
      setColumns(Object.keys(data).map((item) => (data[item])));
    }
    try{
      getFields();
    }catch(e){
      console.log(e);
    }
  },[]);
  useEffect(()=>{
    console.log(props)
  },[props])
  // useEffect(()=>{
  //   console.log(listOfCharts);
  //   console.log(layout);
  // })
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
          <Button variant='contained' onClick={()=>setOpen(true)}> <AddIcon/> Add Visualization</Button> 
          <Button variant='contained'> <FilterAltIcon/> Add Filter</Button>
          <Button variant='contained' onClick={()=>clearAll()}> <ClearIcon/> Clear All</Button>
          <Button variant='contained'> <GetAppIcon/> Export</Button>
          {/* <Button variant='contained' onClick={() => textFileInputRef.current.click()}><FileUploadIcon/> Add Data(For Test)</Button> */}
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
              <MainContainer data={chart.data} index={index} width={chart.width} title={chart.title} type={chart.type} listOfCharts={listOfCharts} setListOfCharts={setListOfCharts} props={props} setProps={setProps} layout={layout} setLayout={setLayout} option={chart.option}/>
            </div>}
            )}
          </ResponsiveReactGridLayout>
        </div>
      <FormDialog title="Add Visualization" open={open} setOpen={setOpen} listOfCharts={listOfCharts} setListOfCharts={setListOfCharts} type='add' listCols={columns}/>
    </div>
  )
}

export default Dashboard