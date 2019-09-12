import React from "react";
import PropTypes from 'prop-types'

class MessageController extends React.Component {
  state={messageRecieved:null,messageSent:null,connected:false}
  componentDidMount() {
    const { socket, name } = this.props;

    this.socket = socket;
    this.socket.on("text_message", data => {
      const { name , message, datetime } = data;


    });


  } 
  sendMessage = () => {
    const { name, targetName, socket } = this.props;
    const { message } = this.props;
    socket.emit("text_message", { name,
      targetName,
      message,
      datetime:new Date().getTime()});
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

MessageController.propTypes ={
  name:PropTypes.string,
  targetName:PropTypes.string,
  socket:PropTypes.object
}
export default MessageController
