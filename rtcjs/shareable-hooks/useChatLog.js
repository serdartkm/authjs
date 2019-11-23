import {h, Component} from 'preact'
import {useState,useEffect} from 'preact/hooks'

const useChatLog =({name,messageRecieved,messageSent})=>{
  const [messages,setMessages]=useState([])
  
  const saveToLocalStorage = (m, key) => {
    const persistedMessages = JSON.parse(localStorage.getItem(key)) === null ? [m] : [...JSON.parse(localStorage.getItem(key)), m]
    localStorage.setItem(key, JSON.stringify(persistedMessages));
    return persistedMessages
}
  // componentDidMount
  useEffect(()=>{
    setMessages(JSON.parse(localStorage.getItem(name)) === null ?
     [] : [...JSON.parse(localStorage.getItem(name))])
     
  },[])
  // saveRemoteMessage
 useEffect(()=>{
   if(messageRecieved!==null)
   {
    const { datetime, message, sender } = messageRecieved
    const local = false
  setMessages(saveToLocalStorage( { message, from: sender, local, datetime, to: name },name))
   }
  
      
 },[messageRecieved])

  // saveLocalMessage
  useEffect(()=>{
    if(messageSent!==null){
     
      const { datetime, message, reciever } = messageSent
      const local = true
      const from =name
    setMessages(saveToLocalStorage( { message, from, local, datetime, to: reciever },name))

    }
},[messageSent])
 

  return {messages}
}

export default useChatLog

