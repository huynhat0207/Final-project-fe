import React, {useState} from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Stack from '@mui/material/Stack';

// import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open= Boolean(anchorEl);
  // const open = Boolean(anchorEl);

  function pressProfile() {
    setAnchorEl(null);
    navigate('/user/profile');
  }
  function pressLogout(){
    setAnchorEl(null);
    navigate('/logout');
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(open);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        onClick={handleClick}
      >
        <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<ExpandMoreIcon sx={{width:'auto', height:'12px',color: '#38bdf8', borderRadius:'9999px' ,background:'#172554'}} />}
        >
          <AccountCircleIcon sx={{width:40, height: 40}}/>
        </Badge>
      </Button> 
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{width: '240px'}}
      >
        {/* <Avatar scr='../Img/avatar.jpg' /> */}
        <MenuItem onClick={pressProfile}>Profile</MenuItem>
        <MenuItem onClick={pressLogout}><LogoutIcon/> Log out</MenuItem>
      </Menu>
    </>
  );
}
export default AvatarDropdown;