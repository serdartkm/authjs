import React from "react";
import io from "socket.io-client";
class WebRTCSignaling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: null,
      answer: null,
      connected: false,
      candidate: null,
      error: null,
      closeConnection:false
    };
  }

  componentDidMount() {
    const { name, serverUrl } = this.props;

    if (serverUrl !== undefined) {
      this.socket = io(serverUrl, { query: `name=${name}` });
    } else {
      this.socket = io();
    }
    this.socket.on("offer", message => {
    
      this.setState({ offer: message.offer });
    });
    this.socket.on("answer", message => {
  
      this.setState({ answer: message.answer });
    });
    this.socket.on("candidate", message => {
   
      this.setState({ candidate: message.candidate });
    });
    this.socket.on("connect", () => {
      this.setState({ connected: true });
    });
    this.socket.on("close", () => {
      this.setState({ closeConnection: true,offer:null,answer:null,candidate:null });
      this.props.resetWebRTCConrtoller()
    });
  } // end of componentDidMount/

  sendCandidate = ({ candidate }) => {
    const { name, targetName } = this.props;

    this.socket.emit("candidate", {
      name,
      targetName,
      candidate
    })

  };

  sendClose = () => {
    const { name, targetName } = this.props;
    this.socket.emit("close", {
      name,
      targetName
    })
    this.setState({closeConnection:true,offer:null,answer:null,candidate:null})
    this.props.resetWebRTCConrtoller()
  };

  sendOffer = ({ offer }) => {

    const { name, targetName } = this.props;

    this.socket.emit("offer", {
      name,
      targetName,
      offer
    })
  };

  sendAnswer = ({ answer }) => {

    const { name, targetName } = this.props;
    this.socket.emit("answer", {
      name,
      targetName,
      answer
    })

  };

  render() {
    const { children } = this.props;
    const signalingContext = {
     ...this.state,
      sendOffer: this.sendOffer,
      sendAnswer: this.sendAnswer,
      sendClose: this.sendClose,
      sendCandidate: this.sendCandidate,
     
    };
    return children(signalingContext)
  }
}

export default WebRTCSignaling;
