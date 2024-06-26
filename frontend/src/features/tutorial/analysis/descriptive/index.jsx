import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
function DescriptivePage() {
  return (
    <Box>
    <Typography variant='h4' gutterBottom sx={{fontWeight: 'bold'}}>
      Descriptive statistics
    </Typography>
    <Typography variant="body1" gutterBottom>
    Descriptive statistics and inferential statistics, along with exploratory statistics, are the main areas of statistics. Descriptive statistics provides tools to describe a sample. Starting from the sample, inferential statistics can now be used to make a statement about the population.
    </Typography>
    </Box>
  )
}

export default DescriptivePage