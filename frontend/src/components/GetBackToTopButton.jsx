import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function GetBackToTopButton() {
    const scrollToTop = () =>{ 
        window.scrollTo({ 
          top: 0,  
          behavior: 'smooth'
        }); 
    };

    return (
    <button className='fixed flex flex-col bottom-5 right-5 z-50 items-center'
    onClick={scrollToTop}
    >
        <KeyboardArrowUpIcon sx={{background:"#0048FF", color:"white", borderRadius:"50%"}} />
        <span className='font-bold text-vivid-blue'>BACK TO TOP</span>
    </button>
    )
}

export default GetBackToTopButton