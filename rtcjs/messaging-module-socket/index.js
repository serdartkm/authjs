import { h } from "preact";
import useSocket from "socket-io-messaging/useSocket";
import MessagesDisplayer from "../reusable-ui/messages-displayer";
import useChatLog from "../reusable-hooks/useChatLog";

const MessagingModuleSocket = ({
  name,
  targetName,

  id = 0,
  height,
  route,serverUrl
}) => {
  const {
    messageSent,
    messageRecieved,
    messageText,
    sendMessage,
    handleMessageChange,
    socket
  } = useSocket({targetName,route,serverUrl });
 
  const { messages } = useChatLog({ name, messageRecieved, messageSent });
  return <MessagesDisplayer id={id} handleMessageChange={handleMessageChange} sendMessage={sendMessage} messageText={messageText} messages={messages} />
  
};

export default MessagingModuleSocket;
