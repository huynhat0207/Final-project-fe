import React, {useState} from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
        <AccountCircleIcon/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={pressProfile}>Profile</MenuItem>
        <MenuItem onClick={pressLogout}>Log out</MenuItem>
      </Menu>
    </>
  );
}
export default AvatarDropdown;