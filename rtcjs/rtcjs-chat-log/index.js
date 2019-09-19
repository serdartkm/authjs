import React from "react";
import { loadFromStorage, saveToLocalStorage } from './LocStorage'
import PropTypes from 'prop-types'

class RTCChatLog extends React.Component {
  state = { messages: [], errors: [] };


  componentDidMount(){
    const {name}= this.props
    this._loadFromStorage({key:name})
    console.log("Component did mount ---")
  this.testMethod()
  }
componentWillReceiveProps(newProps){

  //console.log("props----",this.props)//
  const {messageSent,messageRecieved,name}=this.props
  if(messageSent===null && newProps.messageSent){

    this._saveLocalMessage({key:name, messageSent:newProps.messageSent})
  }else if(messageRecieved===null && newProps.messageRecieved){

    this._saveRemoteMessage({key:name,messageRecieved:newProps.messageRecieved })
  } else if(messageSent !==null && messageSent!==undefined && messageSent.datetime!==undefined &&  newProps.messageSent.datetime> messageSent.datetime){

    this._saveLocalMessage({key:name, messageSent:newProps.messageSent})
  }else if(messageRecieved !==null && messageRecieved !==undefined && messageRecieved.datetime !==undefined && newProps.messageRecieved.datetime>messageRecieved.datetime){
    console.log("-----------------------------------!!!!!!",newProps)
    this._saveRemoteMessage({key:name,messageRecieved:newProps.messageRecieved })
  }
}


testMethod =()=>{
  console.log("test method---")
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
      message: { message, from, local, datetime, to: reciever }, key, onSave: (message) => {
        this.setState((prevState) => ({ messages: [...prevState.messages, message], message: "" }))
      }
    })
  }
  _saveRemoteMessage = ({ key,messageRecieved }) => {//
    const { datetime, message, sender } = messageRecieved
    const local = false
    saveToLocalStorage({
      message: { message, from: sender, local, datetime, to: key }, key, onSave: ({message}) => {
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

RTCChatLog.propTypes = {
  messageSent: PropTypes.object,
  messageRecieved: PropTypes.object,
}



export default RTCChatLog;
