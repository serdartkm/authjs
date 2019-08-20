import React from 'react';
import PropTypes from 'prop-types';

const servers = {
  iceServers: [
    { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.l.google.com:19302' },
  ],
};
/**
 * Component fsdfsdfsdfsdfsdfsdfds
 *
 * @example ../demo-app/RTCPeerProvider.md
 */

class PeerConnection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remoteStream: null,
      error: null,
      connectionState: '',
      signalingState: '',
      localMediaStream: null,
    };
  }

  componentWillMount() {
    this.rtcPeerConnection = new RTCPeerConnection(servers);
  }

  componentDidMount() {
    const { sendCandidate } = this.props;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(this.gotLocalMediaStream)

      .catch(this.handleLocalMediaStreamError);

    this.rtcPeerConnection.onicecandidate = e => {
      if (e.candidate !== null) {
        sendCandidate(e.candidate);
      }
    };

    this.rtcPeerConnection.onconnectionstatechange = () => {
      this.setState({
        connectionState: this.rtcPeerConnection.connectionState,
      });
    };

    this.rtcPeerConnection.onsignalingstatechange = () => {
      this.setState({ signalingState: this.rtcPeerConnection.signalingState });
    };

    this.rtcPeerConnection.onaddstream = e => {
      this.setState({ remoteStream: e.stream });
    };
  } // End of componentDidMount

  componentWillUpdate(nextProps) {
    const { answer, candidate } = this.props;
    if (nextProps.answer !== null && answer === null) {
      this.rtcPeerConnection.setRemoteDescription(
        new RTCSessionDescription(nextProps.answer)
      );
    }

    if (
      this.rtcPeerConnection &&
      this.rtcPeerConnection.remoteDescription !== null
    ) {
      if (candidate === null && nextProps.candidate !== null) {
        this.rtcPeerConnection.addIceCandidate(
          new RTCIceCandidate(nextProps.candidate)
        );
      } else if (nextProps.candidate !== null && nextProps.candidate) {
        if (
          nextProps.candidate !== undefined &&
          nextProps.candidate !== undefined
        ) {
          this.rtcPeerConnection.addIceCandidate(
            new RTCIceCandidate(nextProps.candidate)
          );
        }
      }
    }
  } // END OF COMPONENT DID UPDATE

  componentWillUnmount() {
    this.closeCall();
  }

  gotLocalMediaStream = mediaStream => {
    this.setState({ localMediaStream: mediaStream });
    mediaStream
      .getVideoTracks()
      .forEach(t => this.rtcPeerConnection.addTrack(t, mediaStream));
  };

  handleLocalMediaStreamError = error => {
    this.setState({ error });
  };

  /**
   * Closes connection between connected peers.This method is passed down as props for ui implementation.
   *
   * @public
   */
  closeCall = mediaType => {
    const { sendClose } = this.props;
    if (this.rtcPeerConnection) {
      sendClose(mediaType);
      this.rtcPeerConnection.close();
      this.rtcPeerConnection.onicecandidate = null;
      this.rtcPeerConnection.onconnectionstatechange = null;
      this.rtcPeerConnection.oniceconnectionstatechange = null;
      this.rtcPeerConnection.onicegatheringstatechange = null;
      this.rtcPeerConnection.onsignalingstatechange = null;
      this.rtcPeerConnection.ondatachannel = null;
      this.rtcPeerConnection = null;
    }
  };

  /**
   * creates offer and sends it to the selected peer.This method is passed down as props for ui implementation.
   * @param {string} text
   * @public
   */
  createOffer = offerType => {
    const { sendOffer } = this.props;
    this.rtcPeerConnection
      .createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      })
      .then(offer => {
        this.rtcPeerConnection.setLocalDescription(offer);

        sendOffer(this.rtcPeerConnection.localDescription, offerType);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  /**
   * Creates answer and sends to the peer who sent an offer.This method is passed down as props for ui implementation.
   *
   *
   * @public
   */
  createAnswer = answerType => {
    const { offer, sendAnswer } = this.props;
    this.rtcPeerConnection
      .setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => this.rtcPeerConnection.createAnswer())

      .then(answer => {
        this.rtcPeerConnection.setLocalDescription(answer);

        sendAnswer(this.rtcPeerConnection.localDescription, answerType);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const {
      localMediaStream,
      remoteStream,
      connectionState,
      signalingState,
      error,
    } = this.state;

    const { offer, answer, children } = this.props;
    const context = {
      localMediaStream,
      remoteStream,
      rtcPeerConnection: this.rtcPeerConnection,
      error,
      createOffer: this.createOffer,
      createAnswer: this.createAnswer,
      connectionState,
      signalingState,
      closeCall: this.closeCall,
      offer,
      answer,
    };

    if (children && this.rtcPeerConnection) return children(context);

    return <div data-testid="rtc">Loading...</div>;
  }
}

PeerConnection.propTypes = {
  sendOffer: PropTypes.func.isRequired,
  sendAnswer: PropTypes.func.isRequired,
  sendCandidate: PropTypes.func.isRequired,
  sendClose: PropTypes.func.isRequired,
  offer: PropTypes.object,
  answer: PropTypes.object,
  candidate: PropTypes.object,
  children: PropTypes.func.isRequired,
};

export default PeerConnection;
