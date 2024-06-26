import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import LockIcon from '@mui/icons-material/Lock';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './style.scss';


function SideBar() {
  
  const links = [
      {
        id: 1,
        name: "Profile",
        to: "./profile",
        className: "slide-element",
        icon: <CreateOutlinedIcon sx={{width: '45px', height: '45px'}}/>
      },
      {
        id: 2,
        name: "Notification",
        to: "./notification",
        className: "slide-element",
        icon: <NotificationsNoneIcon sx={{width: '45px', height: '45px'}} />
      },
      {
        id: 3,
        name: "Security",
        to: "./security",
        className: "slide-element",
        icon: <LockIcon sx={{width: '45px', height: '45px'}} />
      },
      {
        id: 4,
        name: "Language",
        to: "./language",
        className: "slide-element",
        icon: <LanguageIcon sx={{width: '45px', height: '45px'}} />
      },
      {
        id: 5,
        name: "Help",
        to: "./help",
        className: "slide-element",
        icon: <HelpOutlineIcon sx={{width: '45px', height: '45px'}} /> 
      }
    ];
  // let [state.links , setState] = useState(1) ; 

  const [curId, setCurId] = useState(1);
  
  const handleClick = (id) => {
    setCurId(id);
  };

  return (
    <div className="sidebar">
        <h2 className="headertext">Settings and Privacy</h2>
        {links.map(link => {
          return(
            <div key={link.id}>
            <Link to={link.to} onClick={() => handleClick(link.id)} className={link.className + (link.id === curId ? " active-item" : "")} >
              {link.icon}
              <div className="slide-text">{link.name}</div>
            </Link>
            </div>
          )
        })}
      </div>
  )
}

export default SideBar