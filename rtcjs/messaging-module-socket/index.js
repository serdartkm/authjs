import {h} from 'preact'
import useSocket from './useSocket'
import MessagesDisplayer from '../shareable-ui/messages-displayer'
import MessageEditorDisplayer from '../shareable-ui/message-editor-displayer'
import useChatLog from '../shareable-hooks/useChatLog'

const MessagingModuleSocket = ({ name, targetName, socket, id=0 ,height="96vh"}) => {
  const {messageSent,messageRecieved, messageText,sendMessage,handleMessageChange} =useSocket({socket,targetName})
  const {messages} =useChatLog({name,messageRecieved,messageSent})
        return (
                    <div style={{ height, width:"100%" }}>
                        <MessagesDisplayer messages={messages} />
                        <MessageEditorDisplayer disabled={socket===null} id={id} message={messageText} sendMessage={sendMessage} onMessageChange={handleMessageChange} />
                    </div>
                )
    }

export default MessagingModuleSocket
