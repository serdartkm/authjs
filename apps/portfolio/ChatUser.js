import {h} from 'preact'
import SocketComponent from './SocketComponent'
import MessageModuleSocket from '../../rtcjs/messaging-module-socket'
const ChatUser = ({ name, targetName }) => {
    return (<SocketComponent username={name}>{(({ socket,connected }) => {
        return (
            <div  style={{flex:1,margin:10}}>
                <div>User:{name}</div>
                <div>{connected ? <i style={{color:"green"}}>connected</i>:<i style={{color:"orange"}}>connecting...</i>}</div>
                <MessageModuleSocket height="50vh" name={name} targetName={targetName} socket={socket} />
            </div>
            
        )
    })}</SocketComponent>)
}

export default ChatUser