import React from 'react'
import SocketComponent from './SocketComponent'
import MessageModuleSocket from '../../rtcjs/messaging-module-socket'
const ChatUser = ({ name, targetName }) => {
    return (<SocketComponent username={name}>{(({ socket }) => {
        return (
            <div  style={{flex:1,margin:10}}>
                User:{name}
                <MessageModuleSocket height="50vh" name={name} targetName={targetName} socket={socket} />
            </div>
            
        )
    })}</SocketComponent>)
}

export default ChatUser