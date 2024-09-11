import React from 'react'
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
function LoadingDialog(props) {
    const {open, message} = props;
    return (
        <Dialog
        open={open}
        >
            <DialogTitle><strong>Please Wait...</strong></DialogTitle>
            <DialogContent>
                <Box display={'flex'} sx={{gap:3, alignItems:'center'}}>
                    <CircularProgress />
                    <div className='text-lg'>{message}</div>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default LoadingDialog