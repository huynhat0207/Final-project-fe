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
  const SearchQuestionsandAnswer = [
    {quest: "What is the size of the dataset and how much data will I need to get from each one?", answer: "Base on the selected work you choose, "},
    {quest: "", answer: ""},
    {quest: "", answer: ""},
  ]
  const FrequencyQuestionsandAnswer = [
    {quest: "What is the size of the dataset and how much data will I need to get from each one?", answer: "Base on the selected work you choose, "},
    {quest: "", answer: ""},
    {quest: "", answer: ""},
  ]
  return (
    <div className='support-body'>
      <h1 className='text-white font-bold text-5xl pt-12 pb-0 z-10'>Welcome! How can we help?</h1>
      <h2 className='text-white text-xl pt-4 pb-6 z-10'>Search in our help center for quick answers</h2>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isSearch?
        <div className='flex flex-col mt-20 w-1/2 rounded-2xl bg-white items-center z-10'>
          <h1 className='font-bold text-4xl mt-4'>Most relevant search results</h1>
          <h2 className='mt-2'>All answers related to your search will be displayed</h2>
          <List sx={{width:'100%'}} >
            {SearchQuestionsandAnswer.map((item) => <NestedList question={item.quest} answer={item.answer}/>)}     
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
      <NavButton/>
    </div>
  )
}
