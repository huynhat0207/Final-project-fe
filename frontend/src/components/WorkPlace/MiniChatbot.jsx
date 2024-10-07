import React, {useEffect} from 'react'
import { Avatar, Box, Paper, Button, Divider, IconButton, Stack, TextField, Icon } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import RemoveIcon from '@mui/icons-material/Remove';
import SendIcon from '@mui/icons-material/Send';
import Typing from '../Animation/Typing';
import ReactMarkdown from 'react-markdown';
import { getChatMessage, createNewMessage, sendMessage } from '../../Service/chatService';
import botImage from '../Img/bot.jpg'

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
          sx={{ width:'100%', paddingLeft:1}}
          />
          <IconButton type="submit" sx={{color:'rgb(0 72 255)'}} ><SendIcon /></IconButton>
          {/* <Button type="submit"></Button> */}
      </Box>
    )
}

const MessageBot = (props) =>{
    const {message} = props;
    return (
      <div className='flex'>
        <Avatar src={botImage}/>
        <div className=' items-center justify-center pt-2 w-4/5 text-base'>
          <ReactMarkdown children={message} className='markdown'/>
        </div>
      </div>
    )
}
const TypingMessageBot = () =>{
  return (
    <div className='flex'>
      <Avatar src={botImage}/>
      <div className='items-center justify-center w-4/5 text-base'>
        <Typing/>
      </div>
    </div>
  )
}
const MessageUser = (props) =>{
    const {message} = props;
    return(
      <div className='flex justify-end'>
        <div className='rounded-l-3xl py-2 px-2 text-white w-auto text-base' style={{backgroundColor:'#0048aa', maxWidth:'80%'}}>{message}</div>
      </div>
    )
}

function MiniChatbot() {
    const [open, setOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [message, setMessage] = React.useState(null);
    const [isChat, setIsChat] = React.useState(false);
    const [waiting, setWaiting] = React.useState(false);
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
        <>
            {open?
            <div className='bottom-0'>
                <Box  sx={{display:'flex', flexDirection:'column' , backgroundColor:'white', width:'300px', height:'400px'}} >
                    <Stack direction="row" alignItems='center' gap={1}>
                        <Avatar src={botImage} />
                        <span className='font-semibold text-deep-blue'>Analysis Assistant</span>
                        <IconButton sx={{alignSelf:'flex-end', color:'rgb(0 72 255)', marginLeft:'auto'}} onClick={()=>setOpen(false)}><RemoveIcon/></IconButton>
                    </Stack>
                    <Divider/>
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
                    {/* <Divider/> */}
                    <div className='self-end w-full flex-initial'><TextInput isChat={isChat} setIsChat={setIsChat} setMessages={setMessages} waiting={waiting} setWaiting={setWaiting} message={message} setMessage={setMessage} /></div>
                </Box>
            </div>
            :<div className='flex'>
                <IconButton 
                size="large"
                onClick={()=>setOpen(true)}
                sx={{color:'rgb(0 72 255)', backgroundColor:'white'}}
                >
                    <ChatIcon/>
                </IconButton>
            </div>}
        </>
    )
}

export default MiniChatbot