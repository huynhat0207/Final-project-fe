import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import './styles.scss';
import logo from '../Img/justLogo.png'
import AvatarDropdown from './Dropdown.jsx'
import { useAuth } from '../Auth/AuthContext.js';
import Button from '@mui/material/Button';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Header = () => {
    const location = useLocation();
    const { isAuthorized } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!isAuthorized) {
    return (
        <header className='bg-blue-950 p-0'>
            <nav className='mx-auto flex items-center justify-between p-6 max-w-7xl'>
                <div className='flex lg:flex-1'>
                    <Link to="/home" className="-m-1.5 p-1.5 flex flex-row">
                    <img
                        loading="lazy"
                        src={logo}
                        alt="Company Logo"
                        className="h-8 w-auto"
                    />
                    <span className='text-xl p-0.5 font-bold'>
                        Data&Retailers
                    </span>
                    </Link>
                
                </div>
                <div className='hidden lg:flex self-stretch justify-between'>
                    <Button variant="text" sx ={{fontSize: '1rem', color: 'rgb(56 189 248)', fontWeight: 700}} onClick={() => {
                            const element = document.getElementById('my-section');
                            element?.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }}>About</Button>
                    <Button variant="text" sx ={{fontSize: '1rem', color: 'rgb(56 189 248)', fontWeight: 700}} onClick={() => {
                            const element = document.getElementById('my-service');
                            element?.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }}>Our Services</Button>
                    {/* <Button variant="text" className='text-xl'>Text</Button> */}
                    <Button variant="text" sx ={{fontSize: '1rem', color: 'rgb(56 189 248)', fontWeight: 700}} onClick={() => {
                            const element = document.getElementById('my-contact');
                            element?.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }}>Contact Us</Button>
                    <Button variant="text" sx ={{fontSize: '1rem', color: 'rgb(56 189 248)', fontWeight: 700}}>SURVEY</Button>
                </div>
                <div className="flex flex-1 justify-end">
                
                <Link to="/login" className="text-xl font-semibold leading-6 text-logo-color">
                    Log in <span aria-hidden="true">&rarr;</span>
                </Link>
                </div>
            </nav>
        </header>
    )}
    else if (location.pathname === '/home') {
    return (
        <header className='bg-blue-950 p-0'>
            <nav className='mx-auto flex items-center justify-between p-6 max-w-7xl '>
                <div className='flex lg:flex-1'>
                    <Link to="/home" className="-m-1.5 p-1.5 flex flex-row">
                    <img
                        loading="lazy"
                        src={logo}
                        alt="Company Logo"
                        className="h-8 w-auto"
                    />
                    <span className='text-xl p-0.5 font-bold text-logo-color'>
                        Data&Retailers
                    </span>
                    </Link>
                
                </div>
                <div className='hidden lg:flex self-stretch justify-between'>
                    <Button variant="text" sx ={{fontSize: '1rem', color: 'rgb(56 189 248)', fontWeight: 700}} onClick={() => {
                            const element = document.getElementById('my-section');
                            element?.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }}>About</Button>
                    <Button variant="text" sx ={{fontSize: '1rem', color: 'rgb(56 189 248)', fontWeight: 700}} onClick={() => {
                            const element = document.getElementById('my-service');
                            element?.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }}>Our Services</Button>
                    <Button variant="text" sx ={{fontSize: '1rem', color: 'rgb(56 189 248)', fontWeight: 700}} onClick={() => {
                            const element = document.getElementById('my-contact');
                            element?.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }}>Contact Us</Button>
                    <Button variant="text" sx ={{fontSize: '1rem', color: 'rgb(56 189 248)', fontWeight: 700}}>SURVEY</Button>
                </div>
                <div className="flex flex-1 justify-end">
                    <Button 
                    variant="contained"
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={()=>{window.location.href="./overview"}}>
                        Go for analysis
                    </Button>
                    <Button>
                        <NotificationsActiveIcon sx={{width:30, height: 30}}/>
                    </Button>
                    <AvatarDropdown/>
                </div>
            </nav>
        </header>
    )}
    return (
        <header className='bg-blue-950 p-0'>
            <nav className='mx-auto flex items-center justify-between p-6 max-w-7xl '>
                <div className='flex lg:flex-1'>
                    <Link to="/home" className="-m-1.5 p-1.5 flex flex-row">
                    <img
                        loading="lazy"
                        src={logo}
                        alt="Company Logo"
                        className="h-8 w-auto"
                    />
                    <span className='text-xl p-0.5 font-bold text-logo-color'>
                        Data&Retailers
                    </span>
                    </Link>
                
                </div>
                <div className='flex self-stretch justify-between'>
                    <Button variant="text" sx ={{fontSize: '1rem', color: 'rgb(56 189 248)', fontWeight: 700}} onClick={()=>{window.location.href='./overview'}}>Overview</Button>
                    <Button variant="text"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx ={{fontSize: '1rem', color: 'rgb(56 189 248)', fontWeight: 700}}
                    >
                        Analysis
                    </Button>
                    <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    >
                    <MenuItem onClick={handleClose}>RFM Analysis</MenuItem>
                    </Menu>
                    <Button variant="text" sx ={{fontSize: '1rem', color: 'rgb(56 189 248)', fontWeight: 700}} onClick={()=>{window.location.href='./dashboard'}}>Dashboard</Button>
                    <Button variant="text" sx ={{fontSize: '1rem', color: 'rgb(56 189 248)', fontWeight: 700}}>Support</Button>
                </div>
                <div className="flex flex-1 justify-end">
                    <Button>
                        <NotificationsActiveIcon sx={{width:30, height: 30}} />
                    </Button>
                    <AvatarDropdown/>
                </div>
            </nav>
        </header>
    ) 
}
export default Header;