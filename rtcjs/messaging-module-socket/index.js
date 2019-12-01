import { h } from "preact";
import useSocket from "./useSocket";
import MessagesDisplayer from "../reusable-ui/messages-displayer";
import useChatLog from "../reusable-hooks/useChatLog";

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
