import React from "react";
import withChatLog from "@rtcjs/chat-log";
class SocketTextChat extends React.Component {
  state = { message: "" };
  componentDidMount() {
    const { socket, name, targetName, getLocalMessages } = this.props;
    getLocalMessages(name);
    this.socket = socket;
    this.socket.on("text_message", data => {
      const { saveToLocalStorage } = this.props;
      const { name, targetName, message, datetime } = data;
      saveToLocalStorage({
        user: "other",
        text: message,
        datetime,
        targetName
      },name);
      console.log(
        `I am ${name} got message from ${targetName} adn the message is ${message}`
      );
    });

    this.socket.emit("join", name, data => {});
    this.socket.on("joined", data => {
      console.log("joined----", data);
    });
  } 

  onTextChange = e => {
    const value = e.target.value;
    this.setState({ message: value });
  };

  sendMessage = () => {
    const { name, targetName, socket, saveToLocalStorage } = this.props;
    const currentDateTime = new Date();
    const { message } = this.state;
    const messageSent = {
      name,
      targetName,
      message,
      datetime: currentDateTime.getTime()
    };
    socket.emit("text_message", messageSent);
    saveToLocalStorage({
      user: "me",
      text: message,
      datetime: currentDateTime.getTime()
    },name);
  };

  render() {
    const { children, messages } = this.props;
    const { message } = this.state;
    return (
      <div>
        {children({
          messages,
          sendMessage: this.sendMessage,
          onTextChange: this.onTextChange,
          message
        })}
      </div>
    );
  }
}

export default withChatLog(SocketTextChat);
