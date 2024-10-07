import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import {Paper, Button, Box, Stack, Chip, Avatar } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
// import FaceIcon from '@mui/icons-material/Face'; 
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { getChatMessage, createNewMessage, sendMessage } from '../../Service/chatService';
import botImage from '../Img/bot.jpg'
import ReactMarkdown from 'react-markdown';
import Typing from '../Animation/Typing';
import Footer from '../Footer/Footer';
// import Stack from '@mui/material';
const TextInput = (props) =>{
  const {isChat, setIsChat, setMessages, waiting, setWaiting, message, setMessage} = props;
  // const [message, setMessage] = useState(null);
  async function sendApi(message){
    if (isChat){
      try{
        setWaiting(true);
        const res = await sendMessage(message);
        if (res){
          setMessage('');
          const res2 = await getChatMessage();
          setMessages(res2);
        }
      }catch(error){
        console.log(error);
      }finally{
        setWaiting(false);
      }
    }
    else {
      try{
        const res = await createNewMessage(message);
        if (res){
          setMessage('');
          const res2 = await getChatMessage();
          setMessages(res2);
          setIsChat(true);
        }
      }catch(error){
        console.log(error);
      }
    }
  }
  const sendAndGetMessages = ()=>{
    sendApi(message);
  }
  const handleSubmit = (event) =>{
    event.preventDefault();
    sendAndGetMessages();
  }
    return(
    <Box
    component="form"
    sx={{ display: 'flex', alignItems: 'center', width:'100%', gap:'1px'}}
    onSubmit={handleSubmit}
    >
        <TextField  
        variant="standard" 
        InputProps={{ disableUnderline: true }}
        placeholder="Start Typing"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{border:'3px solid rgb(56 189 248)', borderRadius:'5px', width:'100%', paddingLeft:1}}/>
        <Button type="submit" variant='contained' endIcon={<SendIcon />}>Send</Button>
    </Box>
  )
}
const MessageBot = (props) =>{
    const {message} = props;
    return (
      <div className='flex'>
        <Avatar src={botImage}/>
        <div className=' items-center justify-center pt-2 w-4/5'>
          <ReactMarkdown children={message} className='markdown'/>
        </div>
      </div>
    )
}
const TypingMessageBot = () =>{
  // const {message} = props;
  return (
    <div className='flex'>
      <Avatar src={botImage}/>
      <div className='items-center justify-center w-4/5'>
        <Typing/>
      </div>
    </div>
  )
}
const MessageUser = (props) =>{
    const {message} = props;
    return(
      <div className='flex justify-end'>
        <div className='rounded-3xl py-2 px-3 text-white w-auto' style={{backgroundColor:'#0048aa', maxWidth:'80%'}}>{message}</div>
      </div>
    )
}
function Chatbot() {
  const [isChat, setIsChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [message, setMessage] = useState(null)
  useEffect(()=>{
    async function getChat(){
      try {
        const res = await getChatMessage();
        setMessages(res);
        setIsChat(true);
      }catch(error){
        if (error.response.data.message === "Does not exist this conversation"){
          setIsChat(false);
        }
      }
    }
    getChat();
  },[]);
  return (
    <div className='mx-32 mt-8 min-h-1000 flex flex-col'>
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
          {!isChat?
          <>
            <div className="text-4xl font-bold mb-5">How can I help you?</div>
            <div className='w-3/5'><TextInput isChat={isChat} setIsChat={setIsChat} setMessages={setMessages} waiting={waiting} setWaiting={setWaiting} message={message} setMessage={setMessage}/></div>
            {/* <Stack direction="row" spacing={1} sx={{paddingTop:2}}>
                <Chip icon={<FaceIcon />} label="Summarize"/>
                <Chip icon={<FaceIcon />} label="Brainstorm"/>
            </Stack> */}
          </>:
            <Paper sx={{display:'flex', flexDirection:'column', width:'60%', height:'100%', marginX:2}} zDepth={2}>
                <Paper sx={{display:'flex', flexDirection:'column-reverse', height:'auto', flex:'1 1', overflowY:"auto", gap:2}}>
                  {waiting && 
                  <>
                  <TypingMessageBot/>
                  <MessageUser message={message}/>
                  </>}
                  {messages.toReversed().map((item) => <>
                      <MessageBot message={item.ai_response}/>
                      <MessageUser message={item.user_response}/>
                  </>)}
                </Paper>
                <div className='self-end w-full flex-initial'><TextInput isChat={isChat} setIsChat={setIsChat} setMessages={setMessages} waiting={waiting} setWaiting={setWaiting} message={message} setMessage={setMessage} /></div>
            </Paper>}
        </Paper>
        <div className='items-end mt-auto'>
          <Footer/>
        </div>
    </div>
    
  )
}

export default Chatbot