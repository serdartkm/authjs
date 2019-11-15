import {h,Component} from 'preact'
import MessagingController from '../messaging-controller-socket'
import MessagesDisplayer from '../messages-displayer'
import MessageEditorDisplayer from '../message-editor-displayer'
import RTCChatLog from '../rtcjs-chat-log'
const MessagingModuleSocket = ({ name, targetName, socket, id=0 ,height="96vh"}) => {

    return (<MessagingController targetName={targetName} socket={socket}>{({ messageSent, messageRecieved, message, sendMessage, onMessageChange }) => {
        return (<RTCChatLog messageRecieved={messageRecieved} messageSent={messageSent} name={name}>{({ messages }) => {
                return (
                    <div style={{ height, width:"100%" }}>
                        <MessagesDisplayer messages={messages} />
                        <MessageEditorDisplayer disabled={socket===null} id={id} message={message} sendMessage={sendMessage} onMessageChange={onMessageChange} />
                    </div>
                )
            }}</RTCChatLog>
      )
    }}</MessagingController>)
}
export default MessagingModuleSocket
