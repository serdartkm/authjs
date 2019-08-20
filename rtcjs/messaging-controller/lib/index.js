import React from "react";
import withChatLog,{loadFromStorage,saveToLocalStorage} from "@rtcjs/chat-log";
class MessagingController extends React.Component {
  state = { message: "",messages:[] };
  componentDidMount() {
    const { socket, name } = this.props;
    loadFromStorage({key:name,onLoad:({messages})=>{
      this.setState({messages})
    }});
    this.socket = socket;
    this.socket.on("text_message", data => {
     
      const { name, targetName, message, datetime } = data;
      console.log("message recived---====",data)
      const localMessage = {
        from :name,
        message,
        datetime,
        targetName,
        local:false
      }
      saveToLocalStorage({ message:localMessage,key:this.props.name});
      this.setState((prevState)=>({messages:[...prevState.messages,localMessage]}))
      this.gotoBottom("messageContainer")
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
    console.log("message state-------",this.state.message)
  };
   gotoBottom=(name)=>{
    var elements = document.getElementsByName(name);
    elements.forEach(e=>{
      e.scrollTop = e.scrollHeight - e.clientHeight;
    })
 }
  sendMessage = () => {
    const { name, targetName, socket } = this.props;
    const currentDateTime = new Date();
    const { message } = this.state;
    
    const messageSent = {
      name,
      targetName,
      message,
      datetime: currentDateTime.getTime()
    };
    socket.emit("text_message", messageSent);
    const localMessage ={
      local:true,
      message,
      from:name,
      datetime: currentDateTime.getTime()
      }
    saveToLocalStorage({message:localMessage,key:name});
    this.setState((prevState)=>({messages:[...prevState.messages,localMessage]}))
    this.gotoBottom("messageContainer")
    this.setState({message:""})
  };
  render() {
    const { children } = this.props;
    const { message,messages } = this.state;
    return children({
          messages,
          sendMessage: this.sendMessage,
          onTextChange: this.onTextChange,
          message
        })
  }
}

export default MessagingController
