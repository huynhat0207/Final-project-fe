import {React, useState} from 'react'
import './styles.scss'
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import Plot from 'react-plotly.js';
// import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import TablePagination from '@mui/material/TablePagination';

function Clustering() {
  const [metric, setMetric] = useState(['example', 'example', 'example']);
  const [label, setLabel] = useState(['example', 'example', 'example']);
  const [show, setShow] = useState('');

  // const metricCalculate = ['Mean', 'Median', 'Mode', 'Sum', 'Std. Deviation'];
  // const relativeCalculate = ['Frequency', '%'];
  const onOptionChange = e => {
    setShow(e.target.value)
  }
  const centerData = [  
    {Cluster: 1, Salary: 2000, Age: 20},
    {Cluster: 2, Salary: 3000, Age: 40},
    {Cluster: 3, Salary: 2500, Age: 30},
  ]
  const allocationData = [
    {Cluster: 1 ,Salary: 2000, Age: 20 },
    {Cluster: 1 ,Salary: 2000, Age: 20 },
    {Cluster: 1 ,Salary: 2000, Age: 20 },
    {Cluster: 1 ,Salary: 2000, Age: 20 },
    {Cluster: 2, Salary: 3000, Age: 40},
    {Cluster: 2, Salary: 3000, Age: 40},
    {Cluster: 2, Salary: 3000, Age: 40},
    {Cluster: 2, Salary: 3000, Age: 40},
    {Cluster: 3, Salary: 2500, Age: 30},
    {Cluster: 3, Salary: 2500, Age: 30},
    {Cluster: 3, Salary: 2500, Age: 30},
    {Cluster: 3, Salary: 2500, Age: 30},
  ]
  // const columns = Object.keys(data[0]);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  

  return (
  <div>
    <div className="classifi-value">
      <Box sx={{w:100}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
              <div className="var-item">Metric Variables: </div>
              <FormGroup row>
                  {metric.map((item) => <FormControlLabel control={<Checkbox  />} label={item} />)}
              </FormGroup>        
          </Grid>
          <Grid item xs={6}>
              <div className="var-item">Label: </div>
              <FormGroup row>
                  {label.map((item) => <FormControlLabel control={<Checkbox  />} label={item} />)}
              </FormGroup>        
          </Grid>
        </Grid>
        <Box sx={{pt: 4}}>
          <div className="var-item">Calculate:</div>
              <Grid item xs={6}>
                  <FormGroup onChange={onOptionChange}>
                  <RadioGroup row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="kmeans" control={<Radio />} label='K-Means Clustering' />
                      <FormControlLabel value="hierachical" control={<Radio />} label={'Hierachical Clustering'} />
                  </RadioGroup>
                  </FormGroup> 
              </Grid>
        </Box>
      </Box>
    </div>
      {(show === 'kmeans')? 
      <div>
      <h2 className='cluster-heading'>K-Means</h2>
    <Box sx={{display:'flex', flexDirection: 'column', rowGap: '10px'}} >
      <label className='var-item'>Number of clusters</label>
      <TextField
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          sx={{width:'30%'}}
        />
      <Button variant="contained" sx={{width:'10%'}}>Analysis</Button>
    </Box>
    <Box sx={{display:'flex', pt:4, flexDirection: 'column'}}>
    <h3 className='h3-heading'>Cluster Center</h3>
    <Button variant="outlined" startIcon={<ContentCopyIcon />} sx={{mt: 1, mb:1, maxWidth:'90px'}}>Copy</Button>
    <TableContainer component={Paper} sx={{width: '50%'}} >
      <Table aria-label="simple table" size='small'>
        <TableHead>
          <TableRow>
          {Object.keys(centerData[0]).map((item) => <TableCell>{item}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {centerData.map((row) => {
            const name = Object.keys(row);
            return(
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, width:'auto' }}
            >
            {name.map((item) => <TableCell>{row[item]}</TableCell>)}
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </TableContainer>

    <br/>
    <h3 className='h3-heading'>Elbow Curve Chart</h3>
    <Plot
        data={[
            {
                x: [1, 2, 3, 4, 5, 6, 7],
                y: [3.8, 1.4, 0.8, 0.6, 0.44, 0.28, 0.24],
                type: 'scatter'
              },
        ]}
        layout={ {width: 640, height: 480, title: 'Elbow Curve', xaxis:{title:'Number of clusters k'}, yaxis:{title:'Sum of squared distance'}} }
        style={{flex: '1 1 0%'}}
      />
    <h3 className='h3-heading'>Cluster Allocation</h3>
    <Button variant="outlined" startIcon={<ContentCopyIcon />} sx={{mt: 1, mb:1, maxWidth:'90px'}}>Copy</Button>
    <Paper sx={{ width: '50%', overflowX: 'auto', maxHeight: 400}}>
    <TableContainer sx={{}} >
      <Table aria-label="simple table" size='small'>
        <TableHead>
          <TableRow>
          {Object.keys(allocationData[0]).map((item) => <TableCell style={{minWidth: 100 }}>{item}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {allocationData.map((row) => {
            const name = Object.keys(row);
            return(
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, width:'auto' }}
            >
            {name.map((item) => <TableCell style={{minWidth: 100 }}>{row[item]}</TableCell>)}
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </Box>
    </div>
      :(show === 'hierachical')? 
      <Box>
      Hierachical Clustering
      <br/>
      <br/>
      <br/>
      <br/>
      </Box>
      :null
      }

      
  </div>
  )
}


export default Clustering