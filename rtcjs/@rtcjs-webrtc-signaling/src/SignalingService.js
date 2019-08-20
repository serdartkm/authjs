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
      candidate:null,
      error: null,
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
      console.log("offer recieved from ",message.offer)
      this.setState({ offer: message.offer });
    });
    this.socket.on("answer", message => {
      console.log("answer recieved from ",message.name)
      this.setState({ answer: message.answer });
    });
    this.socket.on("candidate", message => {
      console.log("recived candiate from ", this.props.name, message.candidate)
      this.setState({ candidate: message.candidate });
    });
    this.socket.on("connect", () => {
      this.setState({ connected: true });
    });
  } // end of componentDidMount/

  sendCandidate = ({candidate}) => {
    console.log("sending candidate---------",candidate)
    if (true) {
      const { name, targetName } = this.props;
      const message = {
        name,
        targetName,
        candidate
      };

      this.socket.emit("candidate", message)
    } else {
      this.setState({ error: "error sending candidate" });
    }
  };

  sendClose = () => {
    const { name, targetName } = this.props;

    const message = {
      name,
      targetName
    };
    this.socket.emit("close_connection", message)
   
  };

  sendOffer = ({offer}) => {
    if (true) {
      const { name, targetName } = this.props;
   
      const message = {
        name,
        targetName,
        offer
      };

      this.socket.emit("offer", message)

    } else {
      this.setState({ error: "could not call.Please try again" });
    }
  };

  sendAnswer = ({answer}) => {
    if (true) {
      const { name, targetName } = this.props;

      const message = {
        name,
        targetName,
        answer
      };

      this.socket.emit("answer", message)

    } else {
      this.setState({ error: "Could not send answer. Please try again" });
    }
  };



  render() {
    const { answer, offer, candidate, error, connected } = this.state;
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
