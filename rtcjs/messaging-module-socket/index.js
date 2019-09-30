import React from 'react'
import MessagingController from '../messaging-controller-socket'
import MessagesDisplayer from '../messages-displayer'
import MessageEditorDisplayer from '../message-editor-displayer'
import RTCChatLog from '../rtcjs-chat-log'
const MessagingModuleSocket = ({ name, targetName, socket }) => {

    return (<MessagingController targetName={targetName} socket={socket}>{({ messageSent, messageRecieved, message, sendMessage, onMessageChange }) => {
        return (<div >
            <RTCChatLog messageRecieved={messageRecieved} messageSent={messageSent} name={name}>{({ messages }) => {
                return (
                    <div style={{height: "96vh"}}>
                        <MessagesDisplayer messages={messages} />
                        <MessageEditorDisplayer message={message} sendMessage={sendMessage} onMessageChange={onMessageChange} />
                    </div>
                )
            }}</RTCChatLog>

        </div>)
    }}</MessagingController>)
}
export default MessagingModuleSocket
