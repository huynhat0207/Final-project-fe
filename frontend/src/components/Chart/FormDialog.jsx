import React, {useEffect, useState, useCallback} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SingleValue from './Content/SingleValue';
// import Slider from '@mui/material/Slider';
import { FormLabel, Grid } from '@mui/material';
import {Typography} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {getData } from '../Service/chartService';
import { memo } from 'react';
function FormDialog(props) {
    // Props
    const {title, open, setOpen, listOfCharts, setListOfCharts, listCols} = props;
    // States
    const [type, setType] = useState(null);
    // const [size, setSize] = useState(2);
    const [width, setWidth] = useState(4);
    const [height, setHeight] = useState(4);
    const [name, setName] = useState(null);
    // const [num, setNum] = useState(1);
    //States for Single value
    const [isMul, setIsMul] = useState('false');
    const [labelCol, setLabelCol] = useState(null);
    const [xAxis, setXAxis] =useState(null);
    const [yAxis, setYAxis] =useState(null);
    const [func, setFunc] = useState(null);

    // Function
    const handleClose = useCallback(()=>setOpen(false));

    const handleChange = (e) => {
        setType(e.target.value);
    };
    const handleMultipleLines = (e) =>{
        // console.log(e.target.value);
        setIsMul(e.target.value);
    }
    function valuetext(value) {
        return `${value}`;
    };

    // Sample data
    const [fields, setFields] = useState([
        {value: '1', name: "1"},
        {value: '2', name: "2"},
    ]);

    const funcOptions = [
        {name: 'Sum', value:'sum'},
        {name: 'Mean', value:'mean'},
        {name: 'Maximum', value:'max'},
        {name: 'Minimum', value:'min'},
        {name: 'Count', value:'count'}, 
        {name: 'Median', value:'median'},
        {name: 'Standard Deviation', value:'std'},
    ];
    useEffect(() =>{
        if (listCols){
            setFields(listCols.map((item)=> ({value: item, name: item})));
        }
    },[listCols]);
    const setData = () => {
        setListOfCharts([...listOfCharts, {width: parseInt(width), height:parseInt(height), title: name, type: type, option:{ type: type, isMul: isMul, func:func, xAxis: xAxis, yAxis: yAxis, labelCol: labelCol}}]);
    }
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
            component:"form",
            onSubmit: (event) => {
                // const data = getData(type);
                // console.log(data); 
                // if (method === 'add') {
                // setListOfCharts([...listOfCharts, {data:data, width: size, title: name, type: type, option:{label: labelCol, xCol: xAxis, yCol: yAxis}}]);
                setData();
                event.preventDefault();
                handleClose();
            }
        }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{marginTop:"10px"}}>
                    <InputLabel id="type-chart">Type Chart</InputLabel>
                    <Select
                    labelId="type-chart"
                    id="type-chart-select"
                    value={type}
                    label="Type Chart"
                    onChange={handleChange}
                    required
                    >
                        <MenuItem value={'value'}>Single Value</MenuItem>
                        <MenuItem value={'line'}>Line Chart</MenuItem>
                        <MenuItem value={'box'}>Box Plot</MenuItem>
                        <MenuItem value={'bar'}>Bar Chart</MenuItem>
                        <MenuItem value={'pie'}>Pie Chart</MenuItem>
                        <MenuItem value={'histogram'}>Histogram</MenuItem>
                    </Select>
                </FormControl>
                
                {type === 'value' &&
                <>
                    {/* <Typography>
                    Size
                    </Typography> */}
                    {/* <Slider
                        aria-label="Size"
                        aria-labelledby="size-slider"
                        // defaultValue={2}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        shiftStep={3}
                        step={1}
                        marks
                        min={1}
                        max={5}
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    /> */}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <TextField label="Width" value={width} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 12){setWidth(12)} else if(e.target.value <2){setWidth(2)} else {setWidth(e.target.value)}}} type="number" inputProps={{ min: 2, max: 12, step: 1 }}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Height" value={height} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 10) {setHeight(10)} else if (e.target.value <1) {setHeight(2)} else(setHeight(e.target.value))}} type="number" inputProps={{ min: 1, max: 10, step: 1 }}/>
                        </Grid>
                    </Grid>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="func">Function</InputLabel>
                        <Select
                        labelId="func"
                        id="func-select"
                        label="Function"
                        required
                        onChange={(e) => setFunc(e.target.value)}
                        >
                            {funcOptions.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="field">Value Field</InputLabel>
                        <Select
                        labelId="field"
                        id="field-select"
                        label="Value Field"
                        required
                        onChange={(e) => {setXAxis(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField label="Name of the chart" fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>setName(e.target.value)}/>
                </>}
                {type === 'line' &&
                <>
                    {/* <Typography>
                        Size
                    </Typography> */}
                    {/* <Slider
                        aria-label="Size"
                        aria-labelledby="size-slider"
                        // defaultValue={2}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        shiftStep={3}
                        step={1}
                        marks
                        min={2}
                        max={4}
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    /> */}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <TextField label="Width" value={width} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 12){setWidth(12)} else if(e.target.value <2){setWidth(2)} else {setWidth(e.target.value)}}} type="number" inputProps={{ min: 2, max: 12, step: 1 }}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Height" value={height} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 10) {setHeight(10)} else if (e.target.value <1) {setHeight(2)} else(setHeight(e.target.value))}} type="number" inputProps={{ min: 1, max: 10, step: 1 }}/>
                        </Grid>
                    </Grid>
                    <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Number of lines</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={isMul}
                        onChange={handleMultipleLines}
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label="Multiple lines" />
                        <FormControlLabel value={'false'} control={<Radio />} label="Single lines" />
                    </RadioGroup>
                    </FormControl>
                    {isMul === 'true'? <>
                        <FormControl fullWidth sx={{marginTop:"10px"}}>
                            <InputLabel id="label-field">Label Field</InputLabel>
                            <Select
                            labelId="label-field"
                            id="label-field-select"
                            label="Label Field"
                            required
                            onChange={(e) => {setLabelCol(e.target.value);}}
                            >
                                {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                            </Select>
                        </FormControl>
                        </>
                        : null
                    }
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="label-type">Function</InputLabel>
                        <Select
                        labelId="label-type"
                        id="label-type-select"
                        label="Function"
                        required
                        onChange={(e) => setFunc(e.target.value)}
                        >
                            {funcOptions.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="x-axis-field">X-axis Field</InputLabel>
                        <Select
                        labelId="x-axis-field"
                        id="x-axis-field-select"
                        label="X-axis field"
                        required
                        onChange={(e) => {setXAxis(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="y-axis-field">Y-axis Field</InputLabel>
                        <Select
                        labelId="y-axis-field"
                        id="y-axis-field-select"
                        label="Y-axis field"
                        required
                        onChange={(e) => {setYAxis(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField label="Name of the chart" fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>setName(e.target.value)}/>
                </>}
                {type === 'bar' &&
                <>
                    {/* <Typography>
                        Size
                    </Typography> */}
                    {/* <Slider
                        aria-label="Size"
                        aria-labelledby="size-slider"
                        // defaultValue={2}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        shiftStep={3}
                        step={1}
                        marks
                        min={1}
                        max={4}
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    /> */}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <TextField label="Width" value={width} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 12){setWidth(12)} else if(e.target.value <2){setWidth(2)} else {setWidth(e.target.value)}}} type="number" inputProps={{ min: 2, max: 12, step: 1 }}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Height" value={height} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 10) {setHeight(10)} else if (e.target.value <1) {setHeight(2)} else(setHeight(e.target.value))}} type="number" inputProps={{ min: 1, max: 10, step: 1 }}/>
                        </Grid>
                    </Grid>
                    <FormLabel id="demo-row-radio-buttons-group-label">Number of lines</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={isMul}
                        onChange={handleMultipleLines}
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label="Multiple lines" />
                        <FormControlLabel value={'false'} control={<Radio />} label="Single lines" />
                    </RadioGroup>
                    {isMul === 'true'?
                        <FormControl fullWidth sx={{marginTop:"10px"}}>
                            <InputLabel id="label-field">Label Field</InputLabel>
                            <Select
                            labelId="label-field"
                            id="label-field-select"
                            label="Label field"
                            required
                            onChange={(e) => {setLabelCol(e.target.value);}}
                            >
                                {fields.map((item)=> <MenuItem key={item.value} value={item.value}> {item.name} </MenuItem>)}
                            </Select>
                        </FormControl>
                    :null}
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="label-type">Function</InputLabel>
                        <Select
                        labelId="label-type"
                        id="label-type-select"
                        label="Function"
                        required
                        onChange={(e) => setFunc(e.target.value)}
                        >
                            {funcOptions.map((item)=> <MenuItem key={item.value} value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="x-axis-field">X-axis Field</InputLabel>
                        <Select
                        labelId="x-axis-field"
                        id="x-axis-field-select"
                        label="X-axis field"
                        required
                        onChange={(e) => {setXAxis(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem key={item.value} value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="y-axis-field">Y-axis Field</InputLabel>
                        <Select
                        labelId="y-axis-field"
                        id="y-axis-field-select"
                        label="Y-axis field"
                        required
                        onChange={(e) => {setYAxis(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField label="Name of the chart" fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>setName(e.target.value)}/>
                </>}
                {type === 'pie' &&
                <>
                    {/* <Typography>
                        Size
                    </Typography> */}
                    {/* <Slider
                        aria-label="Size"
                        aria-labelledby="size-slider"
                        // defaultValue={2}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        shiftStep={3}
                        step={1}
                        marks
                        min={1}
                        max={4}
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    /> */}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <TextField label="Width" value={width} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 12){setWidth(12)} else if(e.target.value <2){setWidth(2)} else {setWidth(e.target.value)}}} type="number" inputProps={{ min: 2, max: 12, step: 1 }}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Height" value={height} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 10) {setHeight(10)} else if (e.target.value <1) {setHeight(2)} else(setHeight(e.target.value))}} type="number" inputProps={{ min: 1, max: 10, step: 1 }}/>
                        </Grid>
                    </Grid>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="label-type">Function</InputLabel>
                        <Select
                        labelId="label-type"
                        id="label-type-select"
                        label="Type Value"
                        required
                        onChange={(e) => setFunc(e.target.value)}
                        >
                            {funcOptions.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="Label field">Label Field</InputLabel>
                        <Select
                        labelId="label-field"
                        id="label-field-select"
                        label="Label field"
                        required
                        onChange={(e) => {setXAxis(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem key={item.value} value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="y-axis-field">Values Field</InputLabel>
                        <Select
                        labelId="y-axis-field"
                        id="y-axis-field-select"
                        label="Y-axis field"
                        required
                        onChange={(e) => {setYAxis(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField label="Name of the chart" fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>setName(e.target.value)}/>
                </>}
                {type === 'box' &&
                <>
                    {/* <Typography>
                        Size
                    </Typography> */}
                    {/* <Slider
                        aria-label="Size"
                        aria-labelledby="size-slider"
                        // defaultValue={2}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        shiftStep={3}
                        step={1}
                        marks
                        min={1}
                        max={4}
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    /> */}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <TextField label="Width" value={width} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 12){setWidth(12)} else if(e.target.value <2){setWidth(2)} else {setWidth(e.target.value)}}} type="number" inputProps={{ min: 2, max: 12, step: 1 }}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Height" value={height} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 10) {setHeight(10)} else if (e.target.value <1) {setHeight(2)} else(setHeight(e.target.value))}} type="number" inputProps={{ min: 1, max: 10, step: 1 }}/>
                        </Grid>
                    </Grid>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="Label field">Label Field</InputLabel>
                        <Select
                        labelId="label-field"
                        id="label-field-select"
                        label="Label field"
                        required
                        onChange={(e) => {setXAxis(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem key={item.value} value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl> 
   
                    
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="y-axis-field">Values Field</InputLabel>
                        <Select
                        labelId="y-axis-field"
                        id="y-axis-field-select"
                        label="Y-axis field"
                        required
                        onChange={(e) => {setYAxis(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField label="Name of the chart" fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>setName(e.target.value)}/>
                </>}
                {type === 'histogram' &&
                <>
                    {/* <Typography>
                    Size
                    </Typography> */}
                    {/* <Slider
                        aria-label="Size"
                        aria-labelledby="size-slider"
                        // defaultValue={2}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        shiftStep={3}
                        step={1}
                        marks
                        min={1}
                        max={5}
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    /> */}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <TextField label="Width" value={width} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 12){setWidth(12)} else if(e.target.value <2){setWidth(2)} else {setWidth(e.target.value)}}} type="number" inputProps={{ min: 2, max: 12, step: 1 }}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Height" value={height} fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>{if(e.target.value > 10) {setHeight(10)} else if (e.target.value <1) {setHeight(2)} else(setHeight(e.target.value))}} type="number" inputProps={{ min: 1, max: 10, step: 1 }}/>
                        </Grid>
                    </Grid>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="field">Values Field</InputLabel>
                        <Select
                        labelId="field"
                        id="field-select"
                        label="Field"
                        required
                        onChange={(e) => {setXAxis(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem key={item.value} value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField label="Name of the chart" fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>setName(e.target.value)}/>
                </>}

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
            </DialogActions>
        </Dialog>
    )
}


export default memo(FormDialog)