import React, {useState} from 'react'
import './style.scss';
// import avatar from '../../../components/Img/avatar.jpg'
// import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
// import {useForm} from 'react-hook-form'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function Edit() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const [remove, setRemove] = useState(false);
  const ReturnProfilePage = () => {
    setRemove(false);
  }; 
  const SaveEdit = () => {
    setRemove(false);
    window.location.href='./profile';
  }
  return (
    <div className='myedit'>
    <h2 className="h2-edit">Edit my profile</h2>
    <Box component="form" sx={{ display: 'grip'}}>
      <div>
          <TextField 
          sx={{m: 3, ml:2}}
          label="First Name"
          id="first-name"
          placeholder="Enter your first name"
          // onChange={(e) => setFirstName(e.target.value)}
          defaultValue="A"
          />
          <TextField 
          sx={{m: 3, mr: 2}}
          label="Last Name"
          id="last-name"
          placeholder="Enter your last name"
          defaultValue="Nguyen Van"
          // onChange={(e) => setLastName(e.target.value)}
          />
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              // <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <EditIcon sx={{backgroundColor: "white", borderRadius: '50%', cursor: 'pointer'}} className='edit-img'
              onClick={() => console.log("Click!")} 
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              />
            }
            sx={{display:'inline-flex', float: 'right'}}
            >
            <Avatar sx={{width: 100, height: 100}}/> 
          </Badge>
          
      </div>
      <div>
      <TextField 
          sx={{m: 3, ml:2, mr: 2}}
          label="Email"
          id="email"
          fullWidth
          placeholder="Enter your email"
          defaultValue="NguyenVanA@gmail.com"
          // onChange={(e) => setEmail(e.target.value)}
          />
      </div>
      <div>
      <TextField 
          sx={{m: 3, ml:2, mr: 2}}
          label="Address"
          id="address"
          fullWidth
          placeholder="Enter the address"
          defaultValue="Ho Chi Minh City"
          // onChange={(e) => setAddress(e.target.value)}
          />
      </div>
      <TextField 
          sx={{m: 3, ml:2, mr: 2}}
          label="Phone number"
          id="phone"
          fullWidth
          placeholder="Enter the phone number"
          defaultValue="0987654321"
          // onChange={(e) => setPhone(e.target.value)}
          />
      <div>
          <TextField 
          sx={{m: 3, ml:2}}
          label="City"
          id="city"
          placeholder="Enter the city"
          // onChange={(e) => setCity(e.target.value)}
          defaultValue="Ho Chi Minh City"
          />
          <TextField 
          sx={{m: 3, mr: 2}}
          label="State"
          id="state"
          placeholder="Thu Duc District"
          // onChange={(e) => setState(e.target.value)}
          />
      </div>
    </Box>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={()=>setRemove(true)}>Cancel</Button>  
        <Button variant="contained" type='submit' onClick={()=>{window.location.href='./profile';}}>Save</Button> 
      </Stack>
      <Dialog
        open={remove}
        onClose={ReturnProfilePage}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"CANCEL"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel your action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ReturnProfilePage}>No</Button>
          <Button onClick={SaveEdit} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Change your photo.</Typography>
      </Popover>
    </div>
  )
}

export default Edit