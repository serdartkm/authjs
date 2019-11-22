import {h,Component} from 'preact'
import useSocket from './useSocket'
import MessagesDisplayer from '../messages-displayer'
import MessageEditorDisplayer from '../message-editor-displayer'
import RTCChatLog from '../rtcjs-chat-log'

const MessagingModuleSocket = ({ name, targetName, socket, id=0 ,height="96vh"}) => {
  const {messageSent,messageRecieved, messageText,sendMessage,handleMessageChange} =useSocket({socket,targetName})
  
        return (
<RTCChatLog messageRecieved={messageRecieved} messageSent={messageSent} name={name}>
{({ messages }) => {
                return (
                    <div style={{ height, width:"100%" }}>
                        <MessagesDisplayer messages={messages} />
                        <MessageEditorDisplayer disabled={socket===null} id={id} message={messageText} sendMessage={sendMessage} onMessageChange={handleMessageChange} />
                    </div>
                )
            }}
</RTCChatLog>
      )
    }

export default MessagingModuleSocket
