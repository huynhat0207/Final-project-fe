import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
function FileNotFound(props) {
    const {open, setOpen} = props;
    const handleClose = () =>{
        setOpen(false);
    }
    return (
        <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>
            <span className='text-deep-blue font-bold text-2xl'>File not found!</span>
        </DialogTitle>
        <DialogContent>
        You need to upload file before going to this!
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => {window.location.href="./overview"}} autoFocus variant='contained'>
            Back to Overview
            </Button>
        </DialogActions>
    </Dialog>
    )
}

export default FileNotFound