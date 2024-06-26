import React from 'react'
import './styles.scss'
import {Outlet} from 'react-router-dom';
import TableContent from './tableContent'

import Box from '@mui/material/Box';

function Tutorial() {
  return (
    <div className='main-tutorial'>
      <TableContent/>
      <Box sx={{pl: 4, pt: 4, flex: '1 1 0%'}}>
        <Outlet/>
      </Box>
    </div>
  )
}

export default Tutorial