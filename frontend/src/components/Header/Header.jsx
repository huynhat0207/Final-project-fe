import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import './styles.scss';
import logo from '../Img/justLogo.png'
import AvatarDropdown from './Dropdown.jsx'
import { useAuth } from '../Auth/AuthContext.js';
import Button from '@mui/material/Button';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import { useState, useEffect } from 'react';

const Header = () => {
    const location = useLocation();
    const { isAuthorized } = useAuth();
    if (!isAuthorized) {
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
                    <span className='text-xl p-0.5 font-bold bg-'>
                        Data&Retailers
                    </span>
                    </Link>
                
                </div>
                <div className='flex self-stretch justify-between'>
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
        console.group("I'm home")
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
                
                <Button>
                    <NotificationsActiveIcon/>
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
                <div className="flex flex-1 justify-end">
                
                
                <Button>
                    <NotificationsActiveIcon/>
                </Button>
                <AvatarDropdown/>
                </div>
            </nav>
        </header>
    ) 
}
export default Header;