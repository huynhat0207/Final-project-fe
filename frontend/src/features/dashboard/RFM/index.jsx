import {React, useState, useEffect, forwardRef, Fragment} from 'react'
import './styles.scss'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Plot from 'react-plotly.js';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { getNativeSelectUtilityClasses } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
import { TableVirtuoso } from 'react-virtuoso';

function RFMAnalysis(props) {
    const [recency, setRecency]  = useState('');
    // const [frequency, setFrequency] = useState('');
    const [monetary, setMonetary] = useState('');
    // const [rtype, setRtype] = useState('');
    // const [ftype, setFtype] = useState('');
    // const [mtype, setMtype] = useState('');
    const [id, setId] = useState('');
    // API GET name of the columns
    const [columns, setColumns] = useState(['example1', 'example2']);

    // const recencyType = [{name: 'Number of days', value:'num'}, {name: 'Date', value:'date'}];
    // const frequencyType = [{name: 'Amount', value:'amount'}, {name: 'Value counts', value:'value_counts'}];
    // const monetaryType = [{name: 'Amount', value:'amount'}, {name: 'Sum', value:'sum'}];
    const [result, setResult] = useState([]);
    const [isCalculate, setIsCalculate] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('http://127.0.0.1:8000/api/user/all-data-column');
            const json = await data.json();
            setColumns(json.columns);
        }; 
        if (props.isUpload){
            fetchData().catch(console.error);
        };
    },[props.isUpload, props.excelData ])

    const getRFMScore = async() => {
        const formData = new FormData();
        formData.append('timestamp', recency);
        formData.append('monetary', monetary);
        formData.append('customer', id);
        const data = await fetch('http://127.0.0.1:8000/api/user/rfm',{
            method: "POST",
            body: formData,
        });
        const json = await data.json();
        setResult(json["data"]);
    }
    
    const handleRFMAnalysis = () => {
        getRFMScore().catch(console.error);
        console.log(result);
    }
    const [segment, setSegment] = useState({});
    useEffect(()=>{
        const counts = {}
        for (const val of result){
            counts[val["Customer_segment"]] = counts[val["Customer_segment"]] ? counts[val["Customer_segment"]] + 1: 1;
        }
        setSegment(counts)
    },[result])

    // const dataColumns = [
    //     { field: 'customer_id', headerName: 'ID', width: 70 },
    //     { field: 'Recency', headerName: 'Recency', width: 130, type: 'number' },
    //     { field: 'Frequency', headerName: 'Frequency', width: 130, type: 'number' },
    //     { field: 'Monetary', headerName: 'Monetary', width: 130, type: 'number' },

    //     { field: 'R_rank_norm', headerName: 'R Rank Norm', width: 130, type: 'number' },
    //     { field: 'F_rank_norm', headerName: 'F Rank Norm', width: 130, type: 'number' },
    //     { field: 'M_rank_norm', headerName: 'M Rank Norm', width: 130, type: 'number' },
    //     { field: 'RFM_Score', headerName: 'RFM Score', width: 130, type: 'number' },
    //     { field: 'Customer_segment', headerName: 'Customer Segment', width: 130 },
    //     // {
    //     //   field: 'Monetary',
    //     //   headerName: 'Age', type: 'number',
    //     //   width: 90,
    //     // },
    //     // {
    //     //   field: 'fullName',
    //     //   headerName: 'Full name',
    //     //   description: 'This column has a value getter and is not sortable.',
    //     //   sortable: false,
    //     //   width: 160,
    //     //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    //     // },
    // ];

    const dataColumns = [
        { dataKey: 'Customer_id', label: 'ID', width: 70 },
        { dataKey: 'Recency', label: 'Recency', width: 130, numeric: true, },
        { dataKey: 'Frequency', label: 'Frequency', width: 130, numeric: true, },
        { dataKey: 'Monetary', label: 'Monetary', width: 130, numeric: true, },
        { dataKey: 'R_rank_norm', label: 'R Rank Norm', width: 130, numeric: true, },
        { dataKey: 'F_rank_norm', label: 'F Rank Norm', width: 130, numeric: true, },
        { dataKey: 'M_rank_norm', label: 'M Rank Norm', width: 130, numeric: true, },
        { dataKey: 'RFM_Score', label: 'RFM Score', width: 130, numeric: true, },
        { dataKey: 'Customer_segment', label: 'Customer Segment', width: 130 },
        // {
        //   field: 'Monetary',
        //   headerName: 'Age', type: 'number',
        //   width: 90,
        // },
        // {
        //   field: 'fullName',
        //   headerName: 'Full name',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 160,
        //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        // },
    ];
    const VirtuosoTableComponents = {
        Scroller: forwardRef((props, ref) => (
          <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => (
          <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead,
        TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
        TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
    };
    function fixedHeaderContent() {
        return (
          <TableRow>
            {dataColumns.map((column) => (
              <TableCell
                key={column.dataKey}
                variant="head"
                align={column.numeric || false ? 'right' : 'left'}
                style={{ width: column.width }}
                sx={{
                  backgroundColor: 'background.paper',
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        );
    }
    function rowContent(_index, row) {
        return (
          <Fragment>
            {dataColumns.map((column) => (
              <TableCell
                key={column.dataKey}
                align={column.numeric || false ? 'right' : 'left'}
              >
                {row[column.dataKey]}
              </TableCell>
            ))}
          </Fragment>
        );
    }

  return (
    <div>
        <div className="classifi-value">
            <Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={2} sm={4} md={4} key="recency">
                    <div className="var-item">Recency Data: </div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Data</InputLabel>
                        <Select
                        labelId="demo-select-small-label"
                        // id=""
                        value={recency}
                        label="DataRecency"
                        onChange={(e) => setRecency(e.target.value)}
                        >
                        {columns.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
                        <FormHelperText>Select the name of the column containing data about recency.</FormHelperText>
                    </FormControl>
                    {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Current Type</InputLabel>
                        <Select
                        labelId="demo-select-small-label"
                        // id=""
                        value={rtype}
                        label="DataTypeRecency"
                        onChange={(e) => setRtype(e.target.value)}
                        >
                        {recencyType.map((item) => <MenuItem value={item.value}>{item.name}</MenuItem>)}
                        </Select>
                        <FormHelperText>Select the name of the column containing data about recency.</FormHelperText>
                    </FormControl> */}
                </Grid>
                <Grid item xs={2} sm={4} md={4} key="frequency">
                    <div className="var-item">Monetary Data:</div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Data</InputLabel>
                        <Select
                        labelId="demo-select-small-label"
                        // id=""
                        value={monetary}
                        label="DataMonetary"
                        onChange={(e) => setMonetary(e.target.value)}
                        >
                        {columns.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
                        <FormHelperText>Select the name of the column containing data about frequency.</FormHelperText>
                    </FormControl>
                    {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Current Type</InputLabel>
                        <Select
                        labelId="demo-select-small-label"
                        // id=""
                        value={mtype}
                        label="DataTypeMonetary"
                        onChange={(e) => setMtype(e.target.value)}
                        >
                        {monetaryType.map((item) => <MenuItem value={item.value}>{item.name}</MenuItem>)}
                        </Select>
                        <FormHelperText>Select the name of the column containing data about monetary.</FormHelperText>
                    </FormControl> */}
                </Grid>
                <Grid item xs={2} sm={4} md={4} key="identity">
                    <div className="var-item">Customer Data:</div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Data</InputLabel>
                        <Select
                        labelId="demo-select-small-label"
                        // id=""
                        value={id}
                        label="DataCustomer"
                        onChange={(e) => setId(e.target.value)}
                        >
                        {columns.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
                        <FormHelperText>Select the name of the column containing data about frequency.</FormHelperText>
                    </FormControl>
                    {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Current Type</InputLabel>
                        <Select
                        labelId="demo-select-small-label"
                        // id=""
                        value={ftype}
                        label="DataTypeFrequency"
                        onChange={(e) => setFtype(e.target.value)}
                        >
                        {frequencyType.map((item) => <MenuItem value={item.value}>{item.name}</MenuItem>)}
                        </Select>
                        <FormHelperText>Select the name of the column containing data about frequency.</FormHelperText>
                    </FormControl> */}
                </Grid>
            </Grid>
            {/* <div className="var-item">Select Customer Identity columns:</div>
            <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Identity</InputLabel>
                <Select
                labelId="demo-select-small-label"
                // id=""
                value={id}
                label="Identity"
                onChange={(e) => setRecency(e.target.value)}
                >
                {columns.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
                </Select>
                <FormHelperText>Select the name of the column containing data about customer identity.</FormHelperText>
            </FormControl>
            </Box> */}
            <Button variant="contained" onClick={handleRFMAnalysis} >Analysis</Button>
            <FormHelperText>Before clicking the Analysis button, you should select the data fields accurately, otherwise the system will return an error.</FormHelperText>
            </Box>
        </div>
        {isCalculate? 
        <div>
            <h2 className='rfm-heading'>RFM Score Table and Ranking</h2>
            <Button variant="contained">Export</Button>
            {/* Excel data here */}
            {/* <Paper sx={{pt:2, overflowX: 'auto', maxHeight: 400}}>
                    <TableContainer sx={{}} >
                    <Table aria-label="simple table" size='small'>
                        <TableHead>
                        <TableRow>
                        {(result.length !==0 )? Object.keys(result[0]).map((item) => <TableCell style={{minWidth: 100 }}>{item}</TableCell>): null}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {(result.length !==0 )? result.map((row) => {
                            const name = Object.keys(row);
                            return(
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, width:'auto' }}
                            >
                            {name.map((item) => <TableCell style={{minWidth: 100 }}>{row[item]}</TableCell>)}
                            </TableRow>)
                        }): null}
                        </TableBody>
                    </Table>
                    </TableContainer>
            </Paper> */}

            {/* <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={result}
                    columns={dataColumns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}  
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div> */}

            <Paper style={{ height: 400, width: '100%' }}>
                <TableVirtuoso
                    data={result}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>

            <h2 className='rfm-heading'>RFM Histogram</h2>
            <Plot
                data={[
                    {
                        x: result.reduce(function(pV, key, cI){
                            console.log("pv: ", pV);
                            pV.push(key["Monetary"]);
                            return pV; // *********  Important ******
                          }, []),
                        type: 'histogram',
                        name: 'Monetary',
                    },
                    {
                        // x: result.reduce((data, item, index) => {data.push(item['Recency'])}, []),
                        x: result.reduce(function(pV, key, cI){
                            console.log("pv: ", pV);
                            pV.push(key["Recency"]);
                            return pV; // *********  Important ******
                          }, []),
                        xaxis: 'x2',
                        yaxis: 'y2',    
                        type: 'histogram',
                        name: 'Recency',
                    },
                    {
                        // x: result.reduce((data, item, index) => {data.push(item['Frequency'])}, []),
                        x: result.reduce(function(pV, key, cI){
                            console.log("pv: ", pV);
                            pV.push(key["Frequency"]);
                            return pV; // *********  Important ******
                          }, []),
                        xaxis: 'x3',
                        yaxis: 'y3',    
                        type: 'histogram',
                        name: 'Frequency',
                    }
                ]}
                layout={ {width: 960, height: 720, title: 'Histogram',paddingLeft:'10px' , grid: {rows: 1, columns: 3, pattern: 'independent'},} }
                style={{flex: '1 1 0%'}}
            />
            {/* Illustration: https://rfm.rsquaredacademy.com/articles/rfm-customer-level-data_files/figure-html/rfmhist-1.png */}
            {/* <h2 className='rfm-heading'>Segmented Customer Data</h2>
            <Button variant="contained">Export</Button>*/}
            <h2 className='rfm-heading'>Segment Size</h2>
            {/* Excel data here */}
            <Plot
            data={[
                {
                x: Object.keys(segment).map((key) => segment[key]),
                y: Object.keys(segment),
                type: 'bar',
                orientation: 'h',
                name: 'Count Customers by each segmentation.'
                }
            ]}
            layout={ {width: 640, height: 480, title: 'Basic Bar Chart'} }
            style={{flex: '1 1 0%'}}
        />
        </div>
        :null}
    </div>
  )
}

export default RFMAnalysis