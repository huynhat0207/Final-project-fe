import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExcelLogo from '../Img/icons8-excel-48.png';
import TxtLogo from '../Img/icons8-txt-50.png';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import GetBackToTopButton from '../GetBackToTopButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from 'react-select'

function Overview() {
  const [isUpload, setIsUpload] = useState(false);

  function createData(name, description, systemfield) {
    return { name, description, systemfield};
  }
  const option = [{value: "TransactionID", label: "Transaction ID"},
    {value: "Date", label: "Date"},
    {value: "Time", label: "Time"},
    {value: "Customer ID", label: "Customer ID"},
    {value: "Product ID", label: "Product ID"},
    {value: "5", label: "Product Name"},
    {value: "6", label: "Category"},
    {value: "7", label: "Quantity"},
    {value: "8", label: "Unit Price"},
    {value: "9", label: "Total Price"},
    {value: "10", label: "Payment Method"},
    {value: "11", label: "Store Location"},
    {value: "12", label: "Discount"},
    {value: "13", label: "Salesperson ID"},
    {value: "14", label: "Profit Margin"},
    {value: "15", label: "Other"},
  ];

  const selectList = [
    {value: "", name: "Transaction ID", description: "A unique identifier for each transaction or sale."},
    {value: "", name: "Date", description: "The date on which the transaction occurred."},
    {value: "", name: "Time", description: "The time at which the transaction occurred."},
    {value: "", name: "Customer ID", description: "A unique identifier for each customer."},
    {value: "", name: "Product ID", description: "A unique identifier for each product."},
    {value: "", name: "Product Name", description:"The name or description of the product."},
    {value: "", name: "Category", description: "The category to which the product belongs (e.g., electronics, clothing, groceries)."},
    {value: "", name: "Quantity", description: "The number of units of the product sold in the transaction."},
    {value: "", name: "Unit Price", description: "The price per unit of the product."},
    {value: "", name: "Total Price", description: "The total price for the quantity of products sold in the transaction (Quantity * Unit Price)."},
    {value: "", name: "Payment Method", description: "The method of payment used (e.g., cash, credit card, debit card)."},
    {value: "", name: "Store Location", description: "The location of the store where the transaction took place."},
    {value: "", name: "Discount", description: "Any discount applied to the transaction."},
    {value: "", name: "Salesperson ID", description: "A unique identifier for the salesperson handling the transaction."},
    {value: "", name: "Profit Margin", description: "The profit margin on the product sold."},
    {value: "", name: "Other", description: "Other"},
  ];
  const rows = [
    createData("id", "A unique identifier for each transaction or sale.", "TransactionID"),
    createData("date", "The date on which the transaction occurred.", "Date"),
  ]

  return (
    <div className='mx-32 mt-12'> 
      <h1 className=" font-sans text-xl font-bold">Overview</h1>
      <div className='flex'>
        <PreviewIcon sx={{height:"auto", width:"36px"}} />
        <h2 className=" font-sans text-3xl font-bold"> Data Review</h2>
      </div>
      
      {!isUpload?  
      <Box sx={{display: "flex", flexDirection: "column", border:"1px solid", borderStyle:"dotted", margin: "16px 0px", width:"80vw", height:"500px", alignItems:"center", justifyContent:"center"}}>
        <div className="text-xl">Add your data in here</div>
        <div className="text-xl">Once loaded, your data will appear in this section.</div>
        <div className='flex flex-row space-x-4 mt-4'>
        <button className='flex flex-col border rounded w-36 p-1 items-center justify-center bg-light-blue'>
          <img src={ExcelLogo}></img>
          <span >Import from Excel</span>
        </button>
        <button className='flex flex-col border rounded w-36 p-1 items-center justify-center bg-light-blue'>
          <img src={TxtLogo}></img>
          <span>Import from Text/csv</span> 
        </button>
        </div>
      </Box>:null 
      }
      <div className="flex">
        <EditIcon sx={{height:"auto", width:"36px"}} />
        <h2 className=" font-sans text-3xl font-bold">Setting Fields</h2>
      </div>
      <TableContainer component={Paper} sx={{margin:"10px 0px", overflow:"visible"}} >
        <Table sx={{ minWidth: 650, maxWidth: 1000}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Data Field</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>System Field</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell><Select 
                // defaultValue="TransactionID"
                defaultMenuIsOpen="TransactionID"
                options={option}
                />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant='contained'>Apply</Button>
      <GetBackToTopButton/>
    </div>
  )
}

export default Overview