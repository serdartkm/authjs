import React from 'react'
import withChatLog from "@rtcjs/chat-log";
import { createOffer, useDataChannel, rtcStateUpdate, createAnswer } from '@rtcjs/shareables-webrtc'

class MessagingControllerWebRTC extends React.Component {
  state = { connectionState: "", message: "", signalingState: "", error: "",messages:[] }

  componentDidMount() {

    const { getLocalMessages, saveToLocalStorage, name, initiator = false, sendCandidate, sendOffer } = this.props
    getLocalMessages(name);
    // Setup ice handling 

    useDataChannel({
      self: this,
      onMessage: (e) => {
        const { message, datetime, targetName, name } = JSON.parse(e.data)
/*
        saveToLocalStorage({
          from: name,
          message,
          datetime,
          local: false
        }, targetName);
        */
        this.gotoBottom("messageContainer")
      },
      
      onClose: () => { },
      onError: () => { },
      onCandidate: (e) => {
        console.log("candy----", e)
        const { candidate } = e
        sendCandidate({ candidate })
      },
      onSignalingStateChange: ({ signalingState }) => {
        this.setState({ signalingState })
      },
      onConnectionState: ({ connectionState }) => {
        console.log('conny state--', connectionState)
        this.setState({ connectionState })
      },
    })

    if (initiator) {
      createOffer({
        self: this, sendOffer, offerError: ({ error }) => {
          this.setState({ error })
        }
      })
    }
  }

  componentWillUpdate(nextProps) {
    const { answer, offer, candidate, sendAnswer } = this.props
    rtcStateUpdate({
      self: this, nextProps, answer, offer, candidate, createAnswer: ({ offer }) => {
        createAnswer({
          offer, self: this, sendAnswer: ({ answer }) => {
            sendAnswer({ answer })
          }, answerError: () => { }
        })
      }
    })
  } // END OF COMPONENT DID UPDATE

  sendMessage = () => {
    const { name, targetName, saveToLocalStorage } = this.props;
    const currentDateTime = new Date();
    const { message } = this.state;
    const messageSent = {
      name,
      targetName,
      message,
      datetime: currentDateTime.getTime()
    };

    console.log("message sent",messageSent)
    this.dataChannel.send(JSON.stringify(messageSent))
    
    saveToLocalStorage({
      local: true,
      message,
      from: name,
      datetime: currentDateTime.getTime()
    }, this.props.name);
    
     console.log("name----",name)
    this.gotoBottom("messageContainer")
    this.setState({ message: "" })
  }

  gotoBottom = (name) => {
    var elements = document.getElementsByName(name);
    elements.forEach(e => {
      e.scrollTop = e.scrollHeight - e.clientHeight;
    })
  }
  onTextChange = e => {
    const value = e.target.value;
    this.setState({ message: value });
    console.log("message state-------", this.state.message)
  };

  render() {
    const { children, messages } = this.props
    const { connectionState } = this.state
    return children({ connectionState, messages, sendMessage: this.sendMessage, onTextChange: this.onTextChange })

  }


}


export default withChatLog(MessagingControllerWebRTC)