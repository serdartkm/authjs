import React from "react";
import PropTypes from 'prop-types'

class MessageController extends React.Component {
  constructor(){
    super()
    this.state ={messageRecieved:null,messageSent:null,connected:false, message:"",errors:[]}
  }
  
  componentDidMount() {
    const { socket } = this.props;

    this.socket = socket;
    this.socket.on("text_message", data => {
      const { sender , message, datetime } = data;
      this.setState({messageSent:{sender,message,datetime}})
    });

    this.socket.on("connect",()=>{
      this.setState({connected:true})
    })

    this.socket.on("disconnect",()=>{
      this.setState({connected:false})
    })


  } 
  sendMessage = () => {
    console.log("Send message clicked----")
    const { targetName, socket } = this.props;
    const { message } = this.state;
    const datetime = new Date().getTime()
    socket.emit("text_message",{
      reciever:targetName,
      message,
      datetime});
    this.setState({messageSent:{reciever:targetName,datetime,message}})
  };
  onMessageChange=(e)=>{
    console.log("on message change clicked",e.target.value)
    this.setState({message:e.target.value})
  }
  render() {
    const { children } = this.props;
    const {messageRecieved,messageSent,message,errors}= this.state
    return children({messageRecieved,messageSent,message,sendMessage:this.sendMessage,onMessageChange:this.onMessageChange,errors})
  }
}

MessageController.propTypes ={
  name:PropTypes.string,
  targetName:PropTypes.string,
  socket:PropTypes.object
}
export default MessageController
