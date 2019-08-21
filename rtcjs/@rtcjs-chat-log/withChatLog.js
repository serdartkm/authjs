import React from "react";
import { loadFromStorage, saveToLocalStorage } from './LocStorage'
const withChatLog = ComposedComponent =>
  class extends React.Component {
    state = { messages: [], message: "" };

    componentWillMount() { 

    }
    componentDidUpdate(){
 
    }

    loadFromStorage = ({ key }) => {
      loadFromStorage({
        key, onLoad: ({ messages }) => {
          this.setState({ messages })
        }
      })
 
    }

  
    saveLocalMessage =({key,to})=>{
      const local=true;
      const datetime= new Date().getTime()
      const {message}= this.state
      const from =key
      
      saveToLocalStorage({message:{message,from,local,datetime,to},key,onSave:()=>{
        this.setState((prevState)=>({messages:[...prevState.messages,{local,datetime,message,from}],message:""}))
      }})
   
    }
    saveRemoteMessage =({from,key,datetime,message,to})=>{
      console.log("----",from,key,datetime,message)
      const local=false
     saveToLocalStorage({message:{message,from,local,datetime,to},key,onSave:()=>{
      this.setState((prevState)=>({messages:[...prevState.messages,{local,datetime,message,from}]}))
      }})


    }
    onTextChange = e => {
      const value = e.target.value;
      this.setState({ message: value });
      
    };

    render() {
      const { messages, message } = this.state;


      return (
        <ComposedComponent
          {...this.props}
          loadFromStorage={this.loadFromStorage}
          messages={messages}
          message={message}
          saveLocalMessage={this.saveLocalMessage}
          saveRemoteMessage ={this.saveRemoteMessage}
          onTextChange={this.onTextChange}
        />
      );
    }
  };

export default withChatLog;
