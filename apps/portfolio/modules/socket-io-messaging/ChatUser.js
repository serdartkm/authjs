import { h } from "preact";
import MessageModuleSocket from "../../../../rtcjs/messaging-module-socket";

const ChatUser = ({ name, targetName,socket }) => {
  return (

          <MessageModuleSocket
            name={name}
            targetName={targetName}
            socket={socket}
          />
        );
  
};

export default ChatUser;
