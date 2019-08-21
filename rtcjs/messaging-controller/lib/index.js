import React from "react";
import withChatLog from "@rtcjs/chat-log";
class MessagingController extends React.Component {

  componentDidMount() {
    const { socket, name } = this.props;
    this.props.loadFromStorage({key:name})
    this.socket = socket;
    this.socket.on("text_message", data => {
      const { name , message, datetime } = data;
      this.props.saveRemoteMessage({
        from:name,
        message,
        datetime,
        key:this.props.name,
        to:this.props.name
      })   
    });

    this.socket.emit("join", name, data => {});
    this.socket.on("joined", data => {
      console.log("joined----", data);
    });
  } 
  sendMessage = () => {
    const { name, targetName, socket } = this.props;
    const { message } = this.props;
    socket.emit("text_message", { name,
      targetName,
      message,
      datetime:new Date().getTime()});
      this.props.saveLocalMessage({key:name,to:targetName})
  };
  render() {
    const { children,message,messages } = this.props;
    return children({
          messages,
          sendMessage: this.sendMessage,
          onTextChange: this.props.onTextChange,
          message
        })
  }
}
export default withChatLog(MessagingController)
