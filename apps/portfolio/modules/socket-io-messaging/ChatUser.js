import { h } from "preact";
import MessageDisplayer from "../../../../rtcjs/reusable-ui/messages-displayer";


const ChatUser = ({
  name,
  targetName,
  socket,
  errors,
  messages,
  handleMessageChange,
  messageText,
  sendMessage
}) => {
  return (
  

            <MessageDisplayer
              errors={errors}
              socket={socket}
              messages={messages}
              handleMessageChange={handleMessageChange}
              messageText={messageText}
              sendMessage={sendMessage}
            />

  );
};

export default ChatUser;
