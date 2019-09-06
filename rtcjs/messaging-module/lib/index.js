import MessagingController from '@rtcjs/messaging-controller'
import MessagesDisplayer from '@rtcjs/messages-displayer'
import MessageEditorDisplayer from '@rtcjs/message-editor-displayer'
const MessagingModule = ({ name, targetName, socket }) => {
   
    return (<MessagingController name={name} targetName={targetName} socket={socket}>{({ messages, message, sendMessage, onTextChange }) => {
        return (<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",position:"relative"}}>
            <MessagesDisplayer messages={messages} />
            <MessageEditorDisplayer message={message} sendMesage={sendMessage} onTextChange={onTextChange} />
               </div>)
    }}</MessagingController>)
}
export default MessagingModule
//sadfsdfsdfsdfsdfsdfasdasdasd--......