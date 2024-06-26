import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import * as XLSX from 'xlsx';
import TableList from './tableList';
TableFeature.propTypes = {
    excelData: PropTypes.arrayOf(PropTypes.object),
    setExcelData: PropTypes.func,
    isUpload: PropTypes.bool,
    setIsUpload: PropTypes.func
};

function TableFeature(props) {
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
    // submit state

    // onchange event
    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                }
            }
            else {
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('Please select your file');
        }
        setFile(e.target.files[0]);
    }

    // submit event
    const handleFileSubmit = async (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            props.setExcelData(data);
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/data', {
              method: 'POST',
              body: formData,
            });
            // Handle response as needed
          } catch (error) {
            console.error('Error uploading file:', error);
          }
          props.setIsUpload(true);
    };
    return (

        <div>
            <TableList excelData={props.excelData} typeError={typeError} handleFile={handleFile} handleFileSubmit={handleFileSubmit} setExcelData={props.setExcelData} />
        </div>
    );
}

export default TableFeature;