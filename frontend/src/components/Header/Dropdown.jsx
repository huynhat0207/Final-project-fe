import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import api from "../Service/apiService";
// import Acount from '../Management/Acount';
// import Stack from '@mui/material/Stack';

// import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Account from '../Management/Account';

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  function pressProfile() {
    setAnchorEl(null);
    setOpenProfile(true);
    //TODO
  }
  function pressSetting() {
    setAnchorEl(null);
    setOpenSetting(true);
    //TODO
  }
  function pressLogout(){
    setAnchorEl(null);
    navigate('/logout');
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(()=>{
    async function getUser(){
      try {
        const res = await api.get('/api/user/me/');
        setName(res.data.name);
        setEmail(res.data.email);
        } catch (error) {
            console.log(error);
            // console.log(error.response.status);
            if (error.code === "ERR_NETWORK"){
              window.location.href = './login';
            }
            if (error.response.status === 401){
              localStorage.clear();
              window.location.href = './login';
            }
            
        } finally {
            
        }
    };
    getUser();
  },[])
  return (
    <>
    <Box sx={{display:'flex', flexGrow: 0 }}>
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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{  
          style: {  
            width: 240,  
          },  
       }} 
      >
        <Box sx={{display: 'flex', flexDirection:'column', alignItems: 'center'}} >
          {/* <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={<EditIcon sx={{width:'auto', height:'12px',color: '#38bdf8', borderRadius:'9999px' ,background:'#172554'}} />}
          >
            <AccountCircleIcon sx={{width:60, height: 60}}/>
          </Badge> */}
          <Avatar sx={{width:60, height: 60}} />
          <span>{name}</span>
          <span>{email}</span>
        </Box>
        <MenuList dense>
          <MenuItem onClick={pressProfile}>
            <ListItemIcon>
              <AccountBoxIcon fontSize='small'/>
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          {/* Add function here */}
          <MenuItem onClick={pressSetting}> 
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText className='text-xl'>Setting</ListItemText>
          </MenuItem>
          <Divider/>
          <MenuItem onClick={pressLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
    <Account open={openProfile} setOpen={setOpenProfile} name={name} email={email} />
    </>
  );
}
export default AvatarDropdown;