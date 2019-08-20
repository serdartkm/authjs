import React from "react";
import WebRTCTextChat from "./WebRTCTextChat";
import SocketTextChat from "./SocketTextChat";
export const TextChatContext = React.createContext();

const WebRTCTextMessage = ({ children, name, targetName, socket }) => {
  return (
    <WebRTCTextChat name={name} targetName={targetName}>
      {({ sendMessage, onTextChange, message, messages }) => {
        return (
          <TextChatContext.Provider
            value={{ sendMessage, message, onTextChange,messages }}
          >
            {children}
          </TextChatContext.Provider>
        );
      }}
    </WebRTCTextChat>
  );
};

const SocketTextMessage = ({ children, name, targetName, socket }) => {
  return (
    <SocketTextChat name={name} targetName={targetName} socket={socket}>
      {({ sendMessage, onTextChange, message, messages }) => {
        return (
          <TextChatContext.Provider
            value={{ sendMessage, message, onTextChange,messages }}
          >
            {children}
          </TextChatContext.Provider>
        );
      }}
    </SocketTextChat>
  );
};

class TextChatProvider extends React.Component {
  render() {
    const {
      name,
      targetName,
      socket,
      children,
      webrtc,
    } = this.props;

 
    if (webrtc) {
      return (
        <WebRTCTextMessage
          children={children}
          socket={socket}
          name={name}
          targetName={targetName}
        />
      );
    } else {
      return (
        <SocketTextMessage
          children={children}
          socket={socket}
          name={name}
          targetName={targetName}
        />
      );
    }
  }
}

export default TextChatProvider;
