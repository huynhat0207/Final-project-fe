import React from 'react'
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton } from '@mui/material';

function GetBackToTopButton() {
    const scrollToTop = () =>{ 
        window.scrollTo({ 
          top: 0,  
          behavior: 'smooth'
        }); 
    };

    return (
        <div className='items-center'>
            <IconButton size="large" sx={{color:'rgb(0 72 255)', backgroundColor:'white'}} onClick={scrollToTop}> <ArrowUpwardIcon/></IconButton>
        </div>
    )
}

export default GetBackToTopButton