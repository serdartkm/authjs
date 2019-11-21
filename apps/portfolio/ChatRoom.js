import {h} from 'preact'
import ChatUser from './ChatUser'
const ChatRoom =()=>{
return(

    <div style={{display:"flex",alignItems:"center"}}>
        <ChatUser name ="mario" targetName="dragos"/>
        <ChatUser name ="dragos" targetName="mario"/>
    </div>
)
}

export default ChatRoom
