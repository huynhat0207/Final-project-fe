import React, {useState} from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

function Account(props) {
    const {open, setOpen, name, email} = props
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
    <Dialog
        onClose={handleClose}
        open={open}
        scroll="paper"
    >
        {/* Title */}
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Account
        </DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            }}
        >
            <CloseIcon />
        </IconButton>
        {/* Content */}
        <Grid container spacing={2}>
            <Grid item xs={4} md={4} sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Avatar sx={{width: '100px', height:'100px', marginLeft:'20px'}} />
                <Button sx={{marginLeft:'20px'}}>Edit</Button>
            </Grid>
            <Grid item xs={8} md={8}  sx={{paddingRight:'50px'}}>
                <DialogContent dividers>
                    <h2 className='font-semibold text-2xl'>Name</h2>
                    <p className='text-lg'>{name}</p>
                    <button className='text-blue-600 hover:bg-blue-200 rounded-lg m-0 p-1'>Change name</button>
                </DialogContent>
                <DialogContent dividers>
                    <h2 className='font-semibold text-2xl'>Email</h2>
                    <span className='text-lg'>{email}</span>
                </DialogContent>
                <DialogContent dividers>
                    <h2 className='font-semibold text-2xl'>Delete account</h2>
                    <button className='text-red hover:bg-rose-200 rounded-lg m-0 p-1'>Delete</button>
                </DialogContent>
            </Grid>
        </Grid>
    </Dialog>
  )
}

export default Account