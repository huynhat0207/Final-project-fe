import React from 'react'
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
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel'
import { Button, Divider, List } from '@mui/material';
import { sampleFields } from './keysDefine';
import InsightsIcon from '@mui/icons-material/Insights';
import Plot from 'react-plotly.js';
import {Card, CardContent, Typography} from '@mui/material';
import { forecastData } from '../Service/analysisService';
import Loading from '../Loading';

function Forecasting() {
    const [time, setTime] = React.useState(1);
    const [metric, setMetric] = React.useState(null);
    const listSample = ['case1', 'case2', 'case3', 'case4', 'case5'];
    const [date, setDate] = React.useState([]);
    const [predict, setPredict] = React.useState([]);
    const [truth, setTruth] = React.useState([]);
    const [mse, setMse] = React.useState(null);
    const [mae, setMae] = React.useState(null);
    const [value, setValue] = React.useState(null);
    const [selectedNames, setSelectedNames] = React.useState([]);
    const [isApply, setIsApply] = React.useState(false);

    async function submitForecast(){
        const res = await forecastData(time, metric);
        console.log(res);
        if (res){
            setDate(res.eval.ds);
            setTruth(res.eval.y_truth);
            setPredict(res.eval.y_hat);
            console.log(res.eval.mse, res.eval.mae, res.eval.value)
            setMse(res.mse);
            setMae(res.mae);
            setValue(res.value);
            setIsApply(true);
        }
    }
    return (
        <div className='mx-32 mt-8 min-h-1000'>
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
                <Grid item xs={2} sm={4} md={4} key="recency">
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

                <Grid item xs={2} sm={4} md={4} key="recency">
            <div className='bg-white rounded-lg p-1 h-full'>
            <div className="font-bold pl-1">Data: </div>
            <FormControl sx={{ m: 1, minWidth: 120, width:'100%', paddingRight:2}} size="small">
                    <InputLabel id="demo-select-small-label">Data</InputLabel>
                    <Select
                    labelId="demo-select-small-label"
                    sx={{width:"auto"}}
                    // id=""
                    value={metric}
                    label="DataRecency"
                    onChange={(e) => setMetric(e.target.value)}
                    >
                    {sampleFields.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
                    </Select>
                    <FormHelperText>Select the name of the column you want to forecast.</FormHelperText>
                    </FormControl>
                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} key="recency">
                    <div className='bg-white rounded-lg p-1 h-auto'>
                    <div className="font-bold pl-1">Filter by: </div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Data</InputLabel>
                        <Select
                        labelId="demo-select-small-label"
                        value={selectedNames}
                        onChange={(e) => setSelectedNames(e.target.value)}
                        multiple
                        // sx={{overflow:'scroll'}}
                        label="Fields"
                        // onChange={(e) => setId(e.target.value)}
                        input={<OutlinedInput label="Multiple Select" maxRows={1} />}
                        // input={<List style={{overflow: 'auto'}} />}
                        renderValue={(selected) => (
                            <Stack gap={1} direction="row" flexWrap="wrap">
                                {selected.map((value) => (
                                    <Chip 
                                        key={value} 
                                        label={value} 
                                        onDelete={() =>
                                            setSelectedNames(
                                            selectedNames.filter((item) => item !== value)
                                            )
                                        }
                                        deleteIcon={
                                        <CancelIcon
                                            onMouseDown={(event) => event.stopPropagation()}
                                        />
                                        }
                                    
                                    />))}
                            </Stack>
                        )}
                        >
                        {listSample.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                        </Select>
                        <FormHelperText>Select the name of the column containing data about customer identity.</FormHelperText>
                    </FormControl>
                    </div>
                </Grid>
            </Grid>
            <Button variant='contained' sx={{marginTop: 1}} onClick={submitForecast}>
                Apply
            </Button>

            <div className='flex text-vivid-blue mt-2'>
                <AssessmentIcon sx={{height:"auto", width:"36px"}} />
                <h2 className=" font-sans text-3xl font-bold"> Forecasting Result</h2>
            </div>
            {isApply?<>
            <h2 className=' text-xl font-bold text-deep-blue my-2 border-b-2 border-deep-blue'> 
                <InsightsIcon/> Training Result Chart
            </h2>
            <div className='flex flex-col items-center mt-4'>
                <Grid 
                    container 
                    spacing={{ xs: 2, md: 3 }} 
                    columns={{ xs: 4, sm: 8, md: 12 }} 
                    flexWrap='wrap'
                    sx={{paddingTop: 2}} 
                >
                    <Grid item xs={2} sm={4} md={4} key="recency">
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
                    <Grid item xs={2} sm={4} md={4} key="recency">
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
                    <Grid item xs={2} sm={4} md={4} key="recency">
                        <Card>
                            <CardContent >
                                <Typography gutterBottom variant="body2" sx={{fontWeight: 600, color: '#107910'}}>
                                    Sum of Predict Values
                                </Typography>
                                <Typography variant="h3" sx={{width:'100%', color: '#077907', overflow: 'hidden', textOverflow:'ellipsis'}} >
                                    {value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
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
        </div>
        
    )
}

export default Forecasting