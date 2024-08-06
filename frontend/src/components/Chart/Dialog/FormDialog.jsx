import React, {useEffect, useState} from 'react'
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
import SingleValue from '../Content/SingleValue';
import Slider from '@mui/material/Slider';
import { FormLabel } from '@mui/material';
import {Typography} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function FormDialog(props) {
    // Props
    const {title, method, open, setOpen, listOfCharts, setListOfCharts, listCols} = props;
    // States
    const [type, setType] = useState(null);
    const [size, setSize] = useState(2);
    const [name, setName] = useState(null);
    const [num, setNum] = useState(1);
    //States for Single value
    const [isMul, setIsMul] = useState('false');
    const [labelCol, setLabelCol] = useState(null);
    const [xAxis, setXAxis] =useState(null);
    const [yAxis, setYAxis] =useState(null);
    const [col0, setCol0] = useState(null);
    const [col1, setCol1] = useState(null);
    const [col2, setCol2] = useState(null);
    const [col3, setCol3] = useState(null);
    const [col4, setCol4] = useState(null);
    const [cal, setCal]   = useState(null);

    // Function
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setType(e.target.value);
    };
    const handleMultipleLines = (e) =>{
        console.log(e.target.value);
        setIsMul(e.target.value);
    }
    const setColumnByIndex = (e, index) =>{
        switch(index){
            case 0: 
            setCol0(e.target.value);
            break;
            case 1: 
            setCol1(e.target.value);
            break;
            case 2: 
            setCol2(e.target.value);
            break;
            case 3: 
            setCol3(e.target.value);
            break;
            case 4: 
            setCol4(e.target.value);
            break;
        }
    }
    function valuetext(value) {
        return `${value}`;
    };

    // Sample data
    const [fields, setFields] = useState([
        {value: '1', name: "1"},
        {value: '2', name: "2"},
    ]);

    const calOptions = [
        {name: 'Count', value:'count'}, 
        {name: 'Mean', value:'mean'},
        {name: 'Sum', value:'sum'},
        {name: 'Minimum', value:'min'},
        {name: 'Maximum', value:'max'},
    ];
    useEffect(() =>{
        if (listCols){
            setFields(listCols.map((item)=> ({value: item, name: item})));
        }
    },[listCols]);
    useEffect(() =>{
        console.log(col0,col1,col2,col3,col4);
    },[col0,col1,col2,col3,col4]);
    
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
            component:"form",
            onSubmit: (event) => {
                if (method === 'add') {
                setListOfCharts([...listOfCharts, {width: size, title: name, type: type, option:{label: labelCol, xCol: xAxis, yCol: yAxis}}]);
                event.preventDefault();
                handleClose();
                }
                // ADD Edit submit
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
                    <Typography>
                    Size
                    </Typography>
                    <Slider
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
                    />
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="field">Field</InputLabel>
                        <Select
                        labelId="field"
                        id="field-select"
                        label="Field"
                        required
                        onChange={(e) => {setLabelCol(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="cal">Calculate</InputLabel>
                        <Select
                        labelId="cal"
                        id="cal-select"
                        label="Calculate"
                        required
                        onChange={(e) => setCal(e.target.value)}
                        >
                            {calOptions.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField label="Name of the chart" fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>setName(e.target.value)}/>
                </>}
                {type === 'line' &&
                <>
                    <Typography>
                        Size
                    </Typography>
                    <Slider
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
                    />
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
                                {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                            </Select>
                        </FormControl>: null
                    }
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
                    {/* <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="label-type">Type Value</InputLabel>
                        <Select
                        labelId="label-type"
                        id="label-type-select"
                        label="Type Value"
                        required
                        onChange={(e) => setCal(e.target.value)}
                        >
                            <MenuItem value="Value Count"> Value Count </MenuItem>
                            <MenuItem value="Sum of Value Column"> Sum of Value Column </MenuItem>
                        </Select>
                    </FormControl> */}
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
                    {/* <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="label-type">Type Value</InputLabel>
                        <Select
                        labelId="label-type"
                        id="label-type-select"
                        label="Type Value"
                        required
                        onChange={(e) => setCal(e.target.value)}
                        >
                            <MenuItem value="Value Count"> Value Count </MenuItem>
                            <MenuItem value="Sum of Value Column"> Sum of Value Column </MenuItem>
                        </Select>
                    </FormControl> */}
                    {/* {cal === "Sum of Value Column" &&
                        <>
                        <FormControl fullWidth sx={{marginTop:"10px"}}>
                            <InputLabel id="Number of value fields">Number of value fields</InputLabel>
                            <Select
                            labelId="num-field"
                            id="num-field-select"
                            label="Number of value fields"
                            defaultValue={1}
                            required
                            onChange={(e) => {setNum(e.target.value);}}
                            >
                                {[1,2,3,4,5].map((item)=><MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
                        </FormControl>
                        {[...Array(num)].map((item, index) => <FormControl fullWidth sx={{marginTop:"10px"}}>
                            <InputLabel id="Value field">Value Field {index}</InputLabel>
                            <Select
                            labelId="value-field"
                            id="value-field-select"
                            label="Value field"
                            required
                            onChange={(e) => setColumnByIndex(e,index)}
                            >
                                {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                            </Select>
                        </FormControl>)}
                        </>
                    } */}
                    <TextField label="Name of the chart" fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>setName(e.target.value)}/>
                </>}
                {type === 'bar' &&
                <>
                    <Typography>
                        Size
                    </Typography>
                    <Slider
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
                    />
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="Label field">Label Field</InputLabel>
                        <Select
                        labelId="label-field"
                        id="label-field-select"
                        label="Label field"
                        required
                        onChange={(e) => {setLabelCol(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="cal">Calculate</InputLabel>
                        <Select
                        labelId="cal"
                        id="cal-select"
                        label="Calculate"
                        required
                        onChange={(e) => setCal(e.target.value)}
                        >
                            <MenuItem value="Value Count"> Value Count </MenuItem>
                            <MenuItem value="Sum of Value Column"> Sum of Value Column </MenuItem>
                        </Select>
                    </FormControl>
                    {cal === "Sum of Value Column" &&
                        <>
                        <FormControl fullWidth sx={{marginTop:"10px"}}>
                            <InputLabel id="Number of value fields">Number of value fields</InputLabel>
                            <Select
                            labelId="num-field"
                            id="num-field-select"
                            label="Number of value fields"
                            defaultValue={1}
                            required
                            onChange={(e) => {setNum(e.target.value);}}
                            >
                                {[1,2,3,4,5].map((item)=><MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
                        </FormControl>
                        {[...Array(num)].map((item, index) => <FormControl fullWidth sx={{marginTop:"10px"}}>
                            <InputLabel id="Value field">Value Field {index}</InputLabel>
                            <Select
                            labelId="value-field"
                            id="value-field-select"
                            label="Value field"
                            required
                            onChange={(e) => setColumnByIndex(e,index)}
                            >
                                {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                            </Select>
                        </FormControl>)}
                        </>
                    }
                    <TextField label="Name of the chart" fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>setName(e.target.value)}/>
                </>}
                {type === 'pie' &&
                <>
                    <Typography>
                        Size
                    </Typography>
                    <Slider
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
                    />
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="Label field">Label Field</InputLabel>
                        <Select
                        labelId="label-field"
                        id="label-field-select"
                        label="Label field"
                        required
                        onChange={(e) => {setLabelCol(e.target.value);}}
                        >
                            {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                        <InputLabel id="cal">Calculate</InputLabel>
                        <Select
                        labelId="cal"
                        id="cal-select"
                        label="Calculate"
                        required
                        onChange={(e) => setCal(e.target.value)}
                        >
                            <MenuItem value="Value Count"> Value Count </MenuItem>
                            <MenuItem value="Sum of Value Column"> Sum of Value Column </MenuItem>
                        </Select>
                    </FormControl>
                    {cal === "Sum of Value Column" &&
                        <>
                        <FormControl fullWidth sx={{marginTop:"10px"}}>
                            <InputLabel id="Number of value fields">Number of value fields</InputLabel>
                            <Select
                            labelId="num-field"
                            id="num-field-select"
                            label="Number of value fields"
                            defaultValue={1}
                            required
                            onChange={(e) => {setNum(e.target.value);}}
                            >
                                {[1,2,3,4,5].map((item)=><MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
                        </FormControl>
                        {[...Array(num)].map((item, index) => <FormControl fullWidth sx={{marginTop:"10px"}}>
                            <InputLabel id="Value field">Value Field {index}</InputLabel>
                            <Select
                            labelId="value-field"
                            id="value-field-select"
                            label="Value field"
                            required
                            onChange={(e) => setColumnByIndex(e,index)}
                            >
                                {fields.map((item)=> <MenuItem value={item.value}> {item.name} </MenuItem>)}
                            </Select>
                        </FormControl>)}
                        </>
                    }
                    <TextField label="Name of the chart" fullWidth variant="outlined" sx={{marginTop:"10px"}} onChange={(e)=>setName(e.target.value)}/>
                </>}

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {method === 'add'? <Button type="submit">Add</Button>: <Button type="submit">Edit</Button>}
            </DialogActions>
        </Dialog>
    )
}


export default FormDialog