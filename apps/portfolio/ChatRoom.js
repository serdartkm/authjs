import {h} from 'preact'
import ChatUser from './ChatUser'

const ChatRoom =()=>{
return[

<div style={{display:"flex",justifyContent:"center"}}>
                <h3>SocketIO text messaging demo</h3>
</div>,
    <div style={{display:"flex",alignItems:"center"}}>
        <ChatUser name="mario" targetName="dragos" />
        <ChatUser name="dragos" targetName="mario" />
    </div>
]
}
export default ChatRoom
