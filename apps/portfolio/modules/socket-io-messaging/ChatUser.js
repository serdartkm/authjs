import { h } from "preact";
import SocketComponent from "./SocketComponent";
import MessageModuleSocket from "../../../../rtcjs/messaging-module-socket";

const ChatUser = ({ name, targetName }) => {
  return (
    <SocketComponent username={name}>
      {({ socket, connected }) => {
          console.log(name,connected)
        return (
          <MessageModuleSocket
            name={name}
            targetName={targetName}
            socket={socket}
          />
        );
      }}
    </SocketComponent>
  );
};

export default ChatUser;
