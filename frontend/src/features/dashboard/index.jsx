import React, { useState } from 'react';
import TableFeature from '../table';
// import { Button } from 'react-bootstrap';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
// import { Link, Outlet } from 'react-router-dom';
import './styles.scss'
import Descriptive from './descriptive';
import Forecasting from './Forecasting';
import Clustering from './clustering';
// import PCA from './PCA';
import RFMAnalysis from './RFM';
// import { useScrollTrigger } from '@mui/material';
function AppHeader({ excelData, setExcelData}) {
    const [choice, setChoice] = React.useState('Descriptive');
    const handleChoice = (event, newChoice) => {
        if (newChoice !== null) {
            setChoice(newChoice);
        }
    };
    const [isUpload, setIsUpload] = useState(false);
    const listOfChoice = [
        {name: 'Descriptive', element: <Descriptive isUpload={isUpload} excelData={excelData} />},
        {name: 'Cluster', element: <Clustering isUpload={isUpload} excelData={excelData} />},
        // {name: 'PCA', element: <PCA />},
        {name: 'Forecasting ', element: <Forecasting isUpload={isUpload} excelData={excelData} />},
        {name: 'RFM', element: <RFMAnalysis isUpload={isUpload} excelData={excelData} />},
    ];
    return (
        <div className='main-container'>
            <h2 className='h2-text' id='my-overview'>Overview</h2>
            <div className='mx-auto'>   
                <TableFeature excelData={excelData} setExcelData={setExcelData} isUpload={isUpload} setIsUpload={setIsUpload}/>
            </div>
            <h2 className='h2-text' id='my-analysis'>Analysis</h2>
            <ToggleButtonGroup
                value={choice}
                exclusive
                onChange={handleChoice}
                color='primary'
            >
                {listOfChoice.map((item) => 
                    <ToggleButton value={item.name} sx={{ '&:hover': { textDecoration: 'underline' } }} className='NavItem'>
                    {item.name}
                    </ToggleButton>
            )}
            </ToggleButtonGroup>
            {listOfChoice.map((item) => (choice === item.name)? item.element: null)}
        </div>
    );
};

export default AppHeader;