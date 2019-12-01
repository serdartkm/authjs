import { h } from "preact";
import useSocket from "./useSocket";
import MessagesDisplayer from "../shareable-ui/messages-displayer";
import MessageEditorDisplayer from "../shareable-ui/message-editor-displayer";
import useChatLog from "../shareable-hooks/useChatLog";

const MessagingModuleSocket = ({
  name,
  targetName,
  socket,
  id = 0,
  height
}) => {
  const {
    messageSent,
    messageRecieved,
    messageText,
    sendMessage,
    handleMessageChange
  } = useSocket({ socket, targetName });
  const { messages } = useChatLog({ name, messageRecieved, messageSent });
  return <MessagesDisplayer id={id} handleMessageChange={handleMessageChange} sendMessage={sendMessage} messageText={messageText} messages={messages} />
  
};

export default MessagingModuleSocket;
