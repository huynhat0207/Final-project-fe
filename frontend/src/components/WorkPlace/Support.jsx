import React, {useState} from 'react'
import '../../styles/Support.css'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { Button, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NavButton from './NavButton';
import Footer from '../Footer/Footer';
import {QAndA} from './keysDefine';
import SearchOffSharpIcon from '@mui/icons-material/SearchOffSharp';
const NestedList = (props) => {
  const {question, answer} = props;
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return(
    <>
    <ListItemButton onClick={handleClick}>
        <ListItemText primary={question} 
          primaryTypographyProps={{
          color:'rgb(0 43 154)',
          fontSize: 20,
          fontWeight: 'bold',
          letterSpacing: 0,
        }}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary={answer} sx={{color:'rgb(0 43 154)'}}/>
          </ListItemButton>
        </List>
      </Collapse>
      <Divider/>
    </>
  )
}

export default function Support() {
  // const [data, setData] = useState(["Hello"])
  const data = QAndA;
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const SearchBar = ({searchQuery, setSearchQuery, isSearch}) => {
    const [value, setValue] = useState("");
    return(
    <Paper
      component="form"
      sx={{ p: '10px 4px', display: 'flex', alignItems: 'center', width: '50%', borderRadius:'100px', zIndex:10 }}
      onSubmit={(e) => {
        e.preventDefault();
        setSearchQuery(value);
        setIsSearch(true);
      }}
    >
    <IconButton sx={{ p: '10px' }} aria-label="menu" disabled>
      <SearchIcon />
    </IconButton >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search for questions by keywords."
      inputProps={{ 'aria-label': 'Search for questions by keywords.' }}
      value={value}
      onInput={e=>setValue(e.target.value)}
    />
    <Button type="submit" sx={{borderRadius:'100px'}} variant='contained'>
      Search
    </Button>
  </Paper>
  )};
  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.quest.toLowerCase().includes(query));
    }
  };
  const dataFiltered = filterData(searchQuery, data);

  const FrequencyQuestionsandAnswer = [
    {quest: "Why is the website not displaying correctly on my device", answer: "This may occur if the website isn’t optimized for your device or browser, especially if it involves complex charts and graphs. Try updating your browser or switching to a different one. Some data analysis websites have specific browser requirements, so check their recommendations for the best experience."},
    {quest: "Why is the website slow to load my data?", answer: "The website may be slow due to large datasets being processed, server overload, or poor internet connectivity. It could also be that the website is running complex algorithms or visualizations that require more resources. Try clearing your browser cache, using a wired connection, or waiting for off-peak hours."},
    {quest: "Why can't I find the specific data or tool I'm looking for on the data analysis website?", answer: "Data analysis websites often have many layers of tools and information. Use the search function to locate specific datasets or analysis tools. If you're still having trouble, explore the help section or user guides to navigate the interface more efficiently."},
  ]
  return (
    <>
    <div className='support-body'>
      <h1 className='text-white font-bold text-5xl pt-12 pb-0 z-10'>Welcome! How can we help?</h1>
      <h2 className='text-white text-xl pt-4 pb-6 z-10'>Search in our help center for quick answers</h2>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} isSearch={isSearch}/>
      {isSearch?
        <div className='flex flex-col mt-20 w-1/2 rounded-2xl bg-white items-center z-10'>
          <h1 className='font-bold text-4xl mt-4'>Most relevant search results</h1>
          <h2 className='mt-2'>All answers related to your search will be displayed</h2>
          <List sx={{width:'100%'}} >
            {dataFiltered.length!==0?
            dataFiltered.map((item) => <NestedList question={item.quest} answer={item.answer}/>):
            <div className='flex flex-col'>
              <div className='flex justify-center'>
              <SearchOffSharpIcon sx={{width:100, height:100, color: 'rgb(0 43 154)'}} />
              </div>
              <div className='flex justify-center text-2xl font-bold text-deep-blue'>Sorry, no results found</div>
              <div className='flex justify-center mt-2'>What you searched was unfortunately not found or doesn't exist.</div>
            </div>
            }     
          </List>
        </div>
      :
        <div className='flex flex-col mt-20 w-1/2 rounded-2xl bg-white items-center z-10'>
          <h1 className='font-bold text-4xl mt-4 text-deep-blue'>Frequently asked questions</h1>
          <h2 className='mt-2 '>May be you can find your answer here!</h2>
          <List sx={{width:'100%'}} >
            {FrequencyQuestionsandAnswer.map((item) => <NestedList question={item.quest} answer={item.answer}/>)}     
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
      <div className='items-end mt-auto w-4/6'>
        <Footer/>
      </div>
    </div>
    <NavButton/>
    </>
  )
}
