import React from 'react'
import ChatUser from './ChatUser'
const ChatRoom =()=>{
return(

    <div style={{display:"flex",alignItems:"center",width:"50%"}}>
        <ChatUser name ="mario" targetName="dragos"/>
        <ChatUser name ="dragos" targetName="mario"/>
    </div>
)
}

export default ChatRoom
