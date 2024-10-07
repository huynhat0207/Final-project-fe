import React, { useEffect} from 'react'
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { sampleFields } from './keysDefine';
import InsightsIcon from '@mui/icons-material/Insights';
import Plot from 'react-plotly.js';
import {Card, CardContent, Typography} from '@mui/material';
import { forecastData } from '../../Service/analysisService';
import Loading from '../Loading';
import LoadingDialog from '../LoadingDialog';
import { getColumns } from '../../Service/dataService';
import { SingleValueApi } from '../../Service/chartService';
import CircularProgress from '@mui/material/CircularProgress';
import NavButton from './NavButton';
import Footer from '../Footer/Footer';
const FilterDialog = (props) =>{
    // Define state
    const {open, setOpen, filter, setFilter} = props;
    const [cols, setCols] = React.useState([]);
    const [cur, setCur] = React.useState('');
    const [values, setValues] = React.useState('');
    const [val, setVal] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    // Funtion
    const handleClose = () =>{
        setOpen(false);
    }
    function addFilter(){
        if (cur in filter === false){
            const newFilter = {...filter, [cur] :val}
            setFilter(newFilter);
        }else{
            console.log('Key is exist');
        }
        setOpen(false);
    }
    // React Hook
    useEffect(()=>{
        var cols;
        async function getCols() {
          try{
            cols = await getColumns();
            if(cols.columns){
                setCols(cols.columns);
            }
          }catch(error){
            console.log(error)
          }
        }
        getCols();
      },[]);
    useEffect(()=>{
        async function getValues() {
            var res;
            setLoading(true);
            try{
                if (cur !== ""){
                    res = await SingleValueApi('unique', cur);
                    if(res.value){
                        setValues(res.value);
                    }
                }
            }catch(error){
              console.log(error)
            }finally{
                setLoading(false);
            }
          }
          getValues();
    },[cur]);
    return(
        <Dialog
        open={open}
        onClose={handleClose}
        // sx={{ width: 320 }}
        sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "380px",
                height:"320px" ,
                // maxWidth: "500px",  // Set your width here
              },
            },
          }}
        >
            <DialogTitle>Add Filter</DialogTitle>
            {!loading?
            <>
            <DialogContent>
                <InputLabel id="cols">Select Column</InputLabel>
                <Select
                labelId='cols'
                label='Select Column'
                value={cur}
                sx={{ width: 300 }}
                onChange={(e) => setCur(e.target.value)}
                >
                    {cols.map((item)=><MenuItem key={item} value={item} >{item}</MenuItem>)}
                </Select>
                {values &&
                <Autocomplete
                disablePortal
                options={values}
                sx={{ width: 300, paddingTop:2 }}
                onChange={(e, newVal) => setVal(newVal)}
                renderInput={(params) => <TextField {...params} label="Select Value" />}
                />}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addFilter}> Add</Button>
            </DialogActions>
            </>
            :
            <div className='flex h-full justify-center items-center justify-items-center'>
            <CircularProgress size={80}/>
            </div>}
        </Dialog>
    )
}

function Forecasting() {
    const [time, setTime] = React.useState(1);
    const [metric, setMetric] = React.useState(null);
    const [filter, setFilter] = React.useState({});
    const [date, setDate] = React.useState([]);
    const [predict, setPredict] = React.useState([]);
    const [truth, setTruth] = React.useState([]);
    const [mse, setMse] = React.useState(null);
    const [mae, setMae] = React.useState(null);
    const [value, setValue] = React.useState(null);
    // const [selectedNames, setSelectedNames] = React.useState([]);
    const [isApply, setIsApply] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    function changeForm(){
        var keys = Object.keys(filter);
        return keys.map((item) => item + ":" + filter[item])
        // return keys.map((item) => ({item:filter[item]}))
    }
    async function submitForecast(){
        setLoading(true);
        try{
            if (Object.keys(filter).length === 0){
                const res = await forecastData(time, metric);
                if (res){
                    setDate(res.eval.ds);
                    setTruth(res.eval.y_truth);
                    setPredict(res.eval.y_hat);
                    // console.log(res.eval.mse, res.eval.mae, res.eval.value)
                    setMse(res.mse);
                    setMae(res.mae);
                    setValue(res.value);
                    setIsApply(true);
                    console.log('Model: ',res.model_name)
                }
            }
            else {
                const res = await forecastData(time, metric, filter);
                if (res){
                    setDate(res.eval.ds);
                    setTruth(res.eval.y_truth);
                    setPredict(res.eval.y_hat);
                    // console.log(res.eval.mse, res.eval.mae, res.eval.value)
                    setMse(res.mse);
                    setMae(res.mae);
                    setValue(res.value);
                    setIsApply(true);
                    console.log('Model: ',res.model_name)
                }
            }
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        console.log(filter);
    },[filter])
    // useEffect(()=>{
    //     console.log(changeForm());
    // },[])
    return (
        <>
        <div className='mx-32 mt-8 min-h-1000 flex flex-col'>
            <div className='flex items-center text-deep-blue'>
                <Link to='../home' ><HomeIcon/></Link>
                <span className='font-bold px-1 font-mono'> &gt; </span>
                <Link to='../dashboard'>
                    <h1 className=" font-sans text-xl font-bold ">Forecasting</h1>
                </Link>
                <span className='font-bold px-1 font-mono'> &gt; </span>
            </div>
            <div className='flex text-vivid-blue'>
                <AddToPhotosIcon sx={{height:"auto", width:"36px"}} />
                <h2 className=" font-sans text-3xl font-bold"> Select Data</h2>
            </div>
            <Grid 
                container 
                spacing={{ xs: 2, md: 3 }} 
                columns={{ xs: 4, sm: 8, md: 12 }} 
                flexWrap='wrap'
                sx={{paddingTop: 2}} 
            >
                <Grid item xs={2} sm={4} md={4} key="numsDays">
                <div className='bg-white rounded-lg p-1 h-full'>
                    <div className="font-bold pl-1">Number of days to forecast: </div>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            {/* <InputLabel id="demo-select-small-label" >Data</InputLabel> */}
                            <TextField 
                                placeholder="Fill a number between 0 and 30" 
                                type='number'
                                helperText="Select the name of the column containing data about recency."
                                size="small"
                                value={time}
                                onChange={(e)=>{setTime(e.target.value)}}
                            />
                            {/* <FormHelperText>Select the name of the column containing data about recency.</FormHelperText> */}
                        </FormControl>
                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} key="data">
            <div className='bg-white rounded-lg p-1 h-full'>
            <div className="font-bold pl-1">Data: </div>
            <FormControl sx={{ m: 1, minWidth: 120, width:'100%', paddingRight:2}} size="small">
                    <InputLabel id="demo-select-small-label">Data</InputLabel>
                    <Select
                    labelId="demo-select-small-label"
                    sx={{width:"auto"}}
                    // id=""
                    value={metric ?? ''}
                    label="Data"
                    onChange={(e) => setMetric(e.target.value)}
                    >
                    {sampleFields.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                    </Select>
                    <FormHelperText>Select the name of the column you want to forecast.</FormHelperText>
                    </FormControl>
                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} key="filterData">
                    <div className='bg-white rounded-lg p-1 h-auto'>
                    <div className="font-bold pl-1">Filter by: </div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Autocomplete
                            clearIcon={false}
                            options={[]}
                            freeSolo
                            multiple
                            size='small'
                            renderTags={(value, props) =>
                                value.map((option, index) => (
                                  <Chip label={option} {...props({ index })} 
                                  onDelete={()=>{
                                    const copyVals= {...filter}
                                    delete copyVals[option.substring(0, option.indexOf(":"))];
                                    setFilter(copyVals);
                                }}
                                  deleteIcon={
                                    <CancelIcon
                                        onMouseDown={(event) => event.stopPropagation()}
                                    />
                                    }
                                  />
                                ))
                            }
                            readOnly
                            value={changeForm()}
                            // onChange={(e)=>setFilter([...filter, e.target.value])}
                            renderInput={(params) => <TextField label="Filter Tags" inputProps={{ readOnly: true }} {...params} />}
                        />
                        <FormHelperText>Select the name of the column containing data about customer identity.</FormHelperText>
                    </FormControl>
                    <Stack>
                        <Button variant='contained' onClick={()=>setOpen(true)} >Create New</Button>
                    </Stack>
                    </div>
                </Grid>
            </Grid>
            <div>
                <Button variant='contained' sx={{marginTop: 1}} onClick={submitForecast}>
                    Apply
                </Button>
            </div>
            <div className='flex text-vivid-blue mt-2'>
                <AssessmentIcon sx={{height:"auto", width:"36px"}} />
                <h2 className=" font-sans text-3xl font-bold"> Forecasting Result</h2>
            </div>
            {isApply?<>
            <h2 className=' text-xl font-bold text-deep-blue my-2 border-b-2 border-deep-blue'> 
                <InsightsIcon/> Predict by {metric} (Next {time} days)
            </h2>
            <div className='mt-4'>
                <Plot
                    data={[
                        {
                            x: value.ds,
                            y: value.yhat,
                            mode: 'lines+markers',
                            name: 'real',
                            line: {shape: 'linear'},
                            type: 'scatter'
                        },
                    ]}
                    layout={{width: 1200, height:600, title: metric+" in "+ time +" days next" }}
                />
            </div>
            <h2 className=' text-xl font-bold text-deep-blue my-2 border-b-2 border-deep-blue'> 
                <InsightsIcon/> Training Result Chart
            </h2>
            <div className='flex flex-col items-center mt-4'>
                <div className='w-3/4'>
                    <Grid 
                        container 
                        spacing={{ xs: 2, md: 3 }} 
                        columns={{ xs: 4, sm: 8, md: 12 }} 
                        flexWrap='wrap'
                        sx={{paddingTop: 2, width:'70%'}}

                    >
                        <Grid item xs={3} sm={6} md={6} key="mse">
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom variant="body2" sx={{fontWeight: 600, color:'#813b80'}}>
                                        Mean Square Error
                                    </Typography>
                                    <Typography variant="h3" sx={{width:'100%', color:'#582857', overflow: 'hidden', textOverflow:'ellipsis'}}>
                                        {mse}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={3} sm={6} md={6} key="mae">
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="body2" sx={{fontWeight: 600, color: '#101079'}}>
                                        Mean Absolute Error
                                    </Typography>
                                    <Typography variant="h3" sx={{width:'100%', color: '#070779', overflow: 'hidden', textOverflow:'ellipsis'}} >
                                        {mae}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        {/* <Grid item xs={2} sm={4} md={4} key="recency">
                            <Card>
                                <CardContent >
                                    <Typography gutterBottom variant="body2" sx={{fontWeight: 600, color: '#107910'}}>
                                        Sum of Predict Values
                                    </Typography>
                                    <Typography variant="h3" sx={{width:'100%', color: '#077907', overflow: 'hidden', textOverflow:'ellipsis'}} >
                                        
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid> */}
                    </Grid>
                </div>
                <Divider></Divider>
                <div className='mt-4'>
                <Plot
                    data={[
                        //Real
                        {
                            x: date,
                            y: truth,
                            mode: 'lines+markers',
                            name: 'real',
                            line: {shape: 'linear'},
                            type: 'scatter'
                        },
                        //Predict
                        {
                            x: date,
                            y: predict, 
                            mode: 'lines+markers',
                            name: 'predict',
                            line: {shape: 'linear'},
                            type: 'scatter'
                        },
                    ]}
                    layout={{width: 1200, height:600, title:'Real & Predict Values based on '+ metric }}
                />
                </div>
            </div>
            </>:
            <Loading title="I'm waiting for you to apply" />
        }
        <div className='items-end mt-auto'>
            <Footer/>
        </div>
        </div>
        <LoadingDialog open={loading} message='Please wait as this may take a few minutes...'/>
        <FilterDialog open={open} setOpen={setOpen} filter={filter} setFilter={setFilter} />
        <NavButton/>
        </>
    )
}

export default Forecasting