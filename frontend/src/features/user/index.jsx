import React from 'react'
import SideBar from './sideBar/index.jsx'
import {Outlet } from 'react-router-dom';

import './style.scss';
function User() {
  return (
    <div className='mainpage'>
      <SideBar/>
      <div className='user-content'>
        <Outlet />
      </div>
    </div>
  )
}

export default User