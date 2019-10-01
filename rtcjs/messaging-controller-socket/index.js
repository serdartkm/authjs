import React from "react";
import PropTypes from 'prop-types'

class MessageControllerSocket extends React.Component {
  _isMounted = false;
  constructor(){
    super()
    this.state ={messageRecieved:null,messageSent:null,connected:false, message:"",errors:[]}
  }
  
  componentDidMount() {
    this._isMounted = true;

    const { socket } = this.props;

    this.socket = socket;
    this.socket.on("text_message", data => {
  
      const { sender , message, datetime } = data;
      if(this._isMounted)
      this.setState({messageSent:{sender,message,datetime}})
    });

    this.socket.on("connect",()=>{
      if(this._isMounted)
      this.setState({connected:true})
    })

    this.socket.on("disconnect",()=>{
      if(this._isMounted)
      this.setState({connected:false})
    })

//
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  sendMessage = () => {

    const { targetName, socket } = this.props;
    const { message } = this.state;
    const datetime =  new Date().getTime()

    socket.emit("text_message",{
      reciever:targetName,
      message,
      datetime});
    this.setState({messageSent:{reciever:targetName,datetime,message},message:""})
  };
  onMessageChange=(e)=>{
 
    this.setState({message:e.target.value})
  }
  render() {
    const { children } = this.props;
    const {messageRecieved,messageSent,message,errors}= this.state
    return children({messageRecieved,messageSent,message,sendMessage:this.sendMessage,onMessageChange:this.onMessageChange,errors})
  }
}

MessageControllerSocket.propTypes ={
  name:PropTypes.string,
  targetName:PropTypes.string,
  socket:PropTypes.object
}
export default MessageControllerSocket
