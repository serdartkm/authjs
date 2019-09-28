import MessagingController from '../messaging-controller-socket'
import MessagesDisplayer from '../messages-displayer'
import MessageEditorDisplayer from '../message-editor-displayer'
import RTCChatLog from '../rtcjs-chat-log'
const MessagingModuleSocket = ({ name, targetName, socket }) => {

    return (<MessagingController targetName={targetName} socket={socket}>{({ messageSent, messageRecieved, message, sendMessage, onMessageChange }) => {
        return (<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
            <RTCChatLog messageRecieved={messageRecieved} messageSent={messageSent} name={name}>{({ messages }) => {
                return (
                    <MessagesDisplayer messages={messages} />
                )
            }}</RTCChatLog>
            <MessageEditorDisplayer message={message} sendMessage={sendMessage} onMessageChange={onMessageChange} />
        </div>)
    }}</MessagingController>)
}
export default MessagingModuleSocket
