import {h, Component} from 'preact'
import {useState, useEffect} from 'preact/hooks'

const useSocketMessaging =({socket,targetName})=>{
const [messageText,setMessageText]=useState('')
const [messageRecieved,setMessageRecieved]=useState(null)
const [messageSent,setMessageSent]=useState(null)
const [connected,setConnected]=useState(false)
const [errors,setError]=useState([])
  const   sendMessage = () => {
  const datetime =  new Date().getTime()
  socket.emit("text_message",{
    reciever:targetName,
    message: messageText,
    datetime});
  setMessageSent({reciever:targetName,datetime,message:messageText})
  setMessageText('')
}

const handleMessageChange =(e)=>{

setMessageText(e.target.value)

}

  useEffect(()=>{
    if(socket !==null){

     
      socket.on("text_message", data => {
        const { sender , message, datetime } = data;
       
      setMessageRecieved({sender,message,datetime})
      });
      socket.on("connect",()=>{
       
        setConnected(true)
      })
  
      socket.on("disconnect",()=>{
        
        setConnected(false)
      })

      socket.on('error',(error)=>{
        setError([...errors,error])
      })
    }

  })



return {messageRecieved,messageSent,messageText,sendMessage,handleMessageChange,errors,connected}

}
export default useSocketMessaging

