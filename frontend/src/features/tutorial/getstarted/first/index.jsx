import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
function GetStarted() {
  return (
    <Box>
    <Typography variant='h4' gutterBottom sx={{fontWeight: 'bold'}}>
      First steps with Data&Retailers
    </Typography>
    <Typography variant="body1" gutterBottom>
      Data&Retailers is a web-based statistics software that runs right here in your browser window.<br/>
      Since it is a web application, it does not need to be downloaded or installed. <br/>
      You can start analyzing your data online in the statistics calculator on Data&Retailers at any time.
    </Typography>
    </Box>
  )
}

export default GetStarted