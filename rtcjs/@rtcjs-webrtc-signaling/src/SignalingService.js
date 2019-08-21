import React from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
class SignalingService extends React.Component {
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
    const { answer, offer, candidate, error, connected,closeConnection } = this.state;
    const { children } = this.props;
    const context = {
      signalingError: error,
      connected,
      answer,
      offer,
      candidate,
      sendOffer: this.sendOffer,
      sendAnswer: this.sendAnswer,
      sendClose: this.sendClose,
      sendCandidate: this.sendCandidate,
      closeConnection
    };
    return children(context)
  }
}
SignalingService.propTypes = {
  /** name of caller */
  name: PropTypes.string.isRequired,
  /** name of callee */
  targetName: PropTypes.string.isRequired,
  /** provide render props to connect signaling service to PeerComponent.See below example */
  children: PropTypes.func.isRequired
};
export default SignalingService;
