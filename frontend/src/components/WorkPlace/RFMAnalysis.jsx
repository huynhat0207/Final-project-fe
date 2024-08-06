import {React, useState, forwardRef, Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { TableVirtuoso } from 'react-virtuoso';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingDot from '../Animation/LoadingDot';
import { rfmAnalysis, getColumns } from '../Service/dataService';
import MenuItem from '@mui/material/MenuItem';
import { visuallyHidden } from "@mui/utils";
import TableSortLabel from '@mui/material/TableSortLabel';
import { Box } from '@mui/material';

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
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableRow>
      {dataColumns.map((headCell) => (
        <TableCell
          key={headCell.dataKey}
          align={headCell.numeric ? "right" : "left"}
          sortDirection={orderBy === headCell.dataKey ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.dataKey}
            direction={orderBy === headCell.dataKey ? order : "asc"}
            onClick={createSortHandler(headCell.dataKey)}
          >
            {headCell.label}
            {orderBy === headCell.dataKey ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  );
}

function RFMAnalysis() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [metric, setMetric] = useState([]);
  const [nominal, setNominal] = useState([]);
  const [recency, setRecency] = useState(null);
  const [id, setId] = useState(null);
  const [monetary, setMonetary] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";

    if (isAsc) {
      data.sort((a, b) => -compare(a, b, property)); // A-Z
    } else {
      data.sort((a, b) => compare(a, b, property)); // Z-A
    }

    setData(data);
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  function compare(a, b, property) {
    if (a[property] < b[property]) {
      return -1;
    }
    if (a[property] > b[property]) {
      return 1;
    }
    return 0;
  }

  const VirtuosoTableComponents = {
    Scroller: forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table stickyHeader {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
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
  async function handleApply(){
    console.log('click');
    setLoading(true);
    var rfmData = await rfmAnalysis(recency, monetary, id);
    // console.log(rfmData);
    setData(rfmData);
    setLoading(false);
    setIsApply(true);
  }
  useEffect(()=>{
    async function getCols() {
      var cols = await getColumns();
      setMetric(cols.metric);
      setNominal(cols.nominal)
    }
    getCols();
  },[]);
  return (
    <div className='mx-32 mt-8 min-h-1000'>
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
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{paddingTop: 2}} >
      <Grid item xs={2} sm={4} md={4} key="recency">
      <div className='bg-white rounded-lg p-1 h-36'>
          <div className="font-bold pl-1">Recency Data: </div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label" >Data</InputLabel>
                  <Select
                  labelId="demo-select-small-label"
                  // id=""
                  value={recency}
                  label="DataRecency"
                  onChange={(e) => setRecency(e.target.value)}
                  >
                  {nominal.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
                  </Select>
                  <FormHelperText>Select the name of the column containing data about recency.</FormHelperText>
          </FormControl>
          </div>
      </Grid>
      <Grid item xs={2} sm={4} md={4} key="recency">
          <div className='bg-white rounded-lg p-1 h-36'>
          <div className="font-bold pl-1">Monetary Data: </div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Data</InputLabel>
                  <Select
                  labelId="demo-select-small-label"
                  // id=""
                  value={monetary}
                  label="DataRecency"
                  onChange={(e) => setMonetary(e.target.value)}
                  >
                  {metric.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
                  </Select>
                  <FormHelperText>Select the name of the column containing data about monetary.</FormHelperText>
          </FormControl>
          </div>
      </Grid>
      <Grid item xs={2} sm={4} md={4} key="recency">
          <div className='bg-white rounded-lg p-1 h-36'>
          <div className="font-bold pl-1">Customer Index: </div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Data</InputLabel>
                  <Select
                  labelId="demo-select-small-label"
                  // id=""
                  value={id}
                  label="DataRecency"
                  onChange={(e) => setId(e.target.value)}
                  >
                  {nominal.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
                  </Select>
                  <FormHelperText>Select the name of the column containing data about customer identity.</FormHelperText>
          </FormControl>
          </div>
      </Grid>
    </Grid>
      <Button variant='contained' sx={{marginTop: 2}} onClick={handleApply}>Apply</Button>
    <div className='flex text-vivid-blue mt-2'>
      <AssessmentIcon sx={{height:"auto", width:"36px"}} />
      <h2 className=" font-sans text-3xl font-bold"> Analysis Result</h2>
    </div>
    
    {isApply?
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
          data={data}
          components={VirtuosoTableComponents}
          // fixedHeaderContent={fixedHeaderContent}
          fixedHeaderContent={() => (
            <EnhancedTableHead
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
            />
          )}
          itemContent={rowContent}
      />
    </Paper>
    :loading? <CircularProgress/>
    :
    <div className='text-center flex flex-col items-center bg-white my-4 mx-0 w-80vw'>
    <LoadingDot/>
    <h3 className='text-3xl font-bold text-vivid-pink'>I'm waiting for you to apply</h3>
    </div>
    }
  </div>
  )
}

export default RFMAnalysis