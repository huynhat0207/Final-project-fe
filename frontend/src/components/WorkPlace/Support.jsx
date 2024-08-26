import React, {useState} from 'react'
import '../../styles/Support.css'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Button } from '@mui/material';
// import IconButton from '@mui/icons-material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const NestedList = (props) => {
  const {question, answer} = props;
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return(
    <>
    <ListItemButton onClick={handleClick}>
        {/* <ListItemIcon>
          <InboxIcon />
        </ListItemIcon> */}
        <ListItemText primary={question} 
          primaryTypographyProps={{
          fontSize: 20,
          fontWeight: 'bold',
          letterSpacing: 0,
        }}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary={answer} />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}

export default function Support() {
  const [data, setData] = useState(["Hello"])
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const SearchBar = ({setSearchQuery}) => (
    <Paper
    component="form"
    sx={{ p: '10px 4px', display: 'flex', alignItems: 'center', width: '50%', borderRadius:'100px', zIndex:10 }}
  >
    <IconButton sx={{ p: '10px' }} aria-label="menu" disabled>
      <SearchIcon />
    </IconButton >
    {/* <SearchIcon sx={{ p: '10px' }}/> */}
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search For Questions"
      inputProps={{ 'aria-label': 'Search for questions.' }}
      // onInput={(e) => {
      //   setSearchQuery(e.target.value);
      // }}
    />
    <Button type="submit" sx={{borderRadius:'100px'}} variant='contained'>
      Search
    </Button>
  </Paper>
  );
  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query));
    }
  };
  const dataFiltered = filterData(searchQuery, data);

  return (
    <div className='support-body'>
      <h1 className='text-white font-bold text-5xl pt-12 pb-0 z-10'>Welcome! How can we help?</h1>
      <h2 className='text-white text-xl pt-4 pb-6 z-10'>Search in our help center for quick answers</h2>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isSearch? null:
        <div className='flex flex-col mt-20 w-1/2 rounded-2xl bg-white items-center z-10'>
          <h1 className='font-bold text-4xl mt-4'>Frequently asked questions</h1>
          <h2 className='mt-2'>May be you can find your answer here!</h2>
          <List sx={{width:'100%'}} >
            <NestedList question="quest 1" answer="answer 1"/>
          </List>
        </div>
      }
      <div className='bubbles'>
        <div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/>
        <div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/>
        <div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/>
        <div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/>
        <div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/>
        <div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/>
        <div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/>
        <div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/>
        <div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/>
        <div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/><div className='bubble'/>
      </div>
    </div>
  )
}
