import React from 'react';
import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton} from '@mui/material';
// import CardContent from '@mui/material';
// import CardContent from '@mui/material/CardContent';

function SingleValue(props) {
  const {column, cal} = props;
  return (
    <CardContent >
    <div>{column} {cal}</div>
    </CardContent>
  )
}

export default SingleValue