import {h, Component} from 'preact'


class MessageControllerSocket extends Component {
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
      this.setState({messageRecieved:{sender,message,datetime}})
    });

    this.socket.on("connect",()=>{
      if(this._isMounted)
      this.setState({connected:true})
    })

    this.socket.on("disconnect",()=>{
      if(this._isMounted)
      this.setState({connected:false})
    })

  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  sendMessage = () => {
    console.log("send message clicked")
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


export default MessageControllerSocket
