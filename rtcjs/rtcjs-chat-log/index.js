import {h, Component} from 'preact'
import { loadFromStorage, saveToLocalStorage } from './LocStorage'


class RTCChatLog extends Component {
  

  constructor(props){
    super (props)
    this.state ={ messages: [], errors: [] };
  }

  componentDidMount(){
    const {name}= this.props
    this._loadFromStorage({key:name})
  

  }
componentWillReceiveProps(newProps){


  const {messageSent,messageRecieved,name}=this.props

  if(messageSent===null && newProps.messageSent){
 //console.log("-----------------------------------messageSent===null",newProps.messageSent)
    this._saveLocalMessage({key:name, messageSent:newProps.messageSent})
  }else 

  if(messageRecieved===null && newProps.messageRecieved){
  //  console.log("-----------------------------------messageRecieved ===null",newProps.messageRecieved)
    this._saveRemoteMessage({key:name,messageRecieved:newProps.messageRecieved })
  } else

   if(messageSent !==null  &&   newProps.messageSent.datetime> messageSent.datetime){
   // console.log("-----------------------------------messageSent !==null",newProps.messageSent)
    this._saveLocalMessage({key:name, messageSent:newProps.messageSent})
  }else 
  
  if(messageRecieved !==null   && newProps.messageRecieved.datetime>messageRecieved.datetime){
  //  console.log("-----------------------------------messageRecieved !==null",newProps.messageRecieved)
    this._saveRemoteMessage({key:name,messageRecieved:newProps.messageRecieved })
  }
}




  _loadFromStorage = ({ key }) => {
    loadFromStorage({
      key, onLoad: ({ messages }) => {
        this.setState({ messages })
      }
    })

  }
  
  _saveLocalMessage = ({ key,messageSent }) => {
    const local = true;
    const from = key
    const { datetime, message, reciever } = messageSent
    saveToLocalStorage({
      message: { message, from, local, datetime, to: reciever }, key, onSave: ({message}) => {
      //  console.log("message local",message)
        this.setState((prevState) => ({ messages: [...prevState.messages, message], message: "" }))
      }
    })
  }

  _saveRemoteMessage = ({ key,messageRecieved }) => {//
    const { datetime, message, sender } = messageRecieved
    const local = false
    saveToLocalStorage({
      message: { message, from: sender, local, datetime, to: key }, key, onSave: ({message}) => {
       // console.log("message remote.....",message)
        this.setState((prevState) => ({ messages: [...prevState.messages, message] }))
      }
    })

  }
  render() {
    const { messages } = this.state;
    const { children } = this.props

    return children({ messages })

  }
};






export default RTCChatLog;
