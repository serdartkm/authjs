import { h } from "preact";
import MessageDisplayer from "../../../../rtcjs/reusable-ui/messages-displayer";
import './style.css'
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
    <div className="root" style={{ height: "97%", width:"50%" }}>
      <MessageDisplayer
        errors={errors}
        socket={socket}
        messages={messages}
        handleMessageChange={handleMessageChange}
        messageText={messageText}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatUser;
