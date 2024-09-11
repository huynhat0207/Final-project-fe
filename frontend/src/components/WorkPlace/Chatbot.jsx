import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import {Paper, Button, Box, Stack, Chip } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import FaceIcon from '@mui/icons-material/Face'; 
import SmartToyIcon from '@mui/icons-material/SmartToy';
// import Stack from '@mui/material';
const TextInput = () =>{
    return(
    <Box
    component="form"
    sx={{ display: 'flex', alignItems: 'center', width:'100%', gap:'1px'}}
    >
        <TextField  
        variant="standard" 
        InputProps={{ disableUnderline: true }}
        placeholder="Start Typing"
        sx={{border:'3px solid rgb(56 189 248)', borderRadius:'5px', width:'100%', paddingLeft:1}}/>
        <Button type="submit" variant='contained' endIcon={<SendIcon />}>Send</Button>
    </Box>
  )
}
const MessageBot = (props) =>{
    const {message } = props;
}
const MessageUser = (props) =>{
    const {message } = props;
}
function Chatbot() {
    const [isChat, setIsChat] = useState(false);
  return (
    <div className='mx-32 mt-8 min-h-1000'>
        <div className='flex items-center text-deep-blue'>
            <Link to='../home' ><HomeIcon/></Link>
            <span className='font-bold px-1 font-mono'> &gt; </span>
            <Link to='../chatbot'>
            <h1 className=" font-sans text-xl font-bold ">Chatbot</h1>
            </Link>
            <span className='font-bold px-1 font-mono'> &gt; </span>
        </div>
        <div className='flex text-vivid-blue'>
            <SmartToyIcon sx={{height:"auto", width:"36px"}} />
            <h2 className=" font-sans text-3xl font-bold"> Analysis Assistant</h2>
        </div>
        <Paper sx={{display: "flex", flexDirection: "column", borderRadius:'5px', margin: "16px 0px", width:"80vw", height:"500px", alignItems:"center", justifyContent:"center", background:"white"}}>
          {isChat?
          <>
            <div className="text-4xl font-bold mb-5">How can I help you?</div>
            <div className='w-3/5'><TextInput/></div>
            <Stack direction="row" spacing={1} sx={{paddingTop:2}}>
                <Chip icon={<FaceIcon />} label="Summarize"/>
                <Chip icon={<FaceIcon />} label="Brainstorm"/>
            </Stack>
          </>:
            <Paper sx={{display:'flex', flexDirection:'column', width:'60%', height:'100%'}} zDepth={2}>
                <Paper sx={{display:'flex', height:'auto', flex:'1 1', overflowY:"auto"}}>
                 Hello
                </Paper>
                <div className='self-end w-full flex-initial'><TextInput/></div>
            </Paper>}
        </Paper>
    </div>
  )
}

export default Chatbot