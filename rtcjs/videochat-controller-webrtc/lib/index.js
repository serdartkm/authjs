import React from 'react'
import PropTypes from 'prop-types';
import { createAnswer, createOffer, closeCall, useMediaStream,rtcStateUpdate } from '@rtcjs/shareables-webrtc'

class VideoChatControllerWebRTC extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      remoteMediaStream: null,
      error: null,
      connectionState: '',
      signalingState: '',
      localMediaStream: null,
    };
  }



  componentDidMount() {
    const { sendCandidate } = this.props
    useMediaStream({
      self: this,
      gotLocalMedia: ({ localMediaStream }) => {
        this.setState({ localMediaStream })
      }, gotMediaError: ({ error }) => {
        this.setState({ error })
      }, onCandidate: (e) => {
        const { candidate } = e
        sendCandidate({ candidate })
      }, onConnectionState: ({ connectionState }) => {
        this.setState({ connectionState })
      }, onSignalingState: ({ signalingState }) => {
        this.setState({ signalingState })
      }, onAddStream: ({ remoteMediaStream }) => {
        this.setState({ remoteMediaStream });
      }
    })
  } // End of componentDidMount

  componentWillUpdate(nextProps) {
    const {answer,offer,candidate} =this.props
  rtcStateUpdate({self:this,nextProps,answer,offer,candidate})

  } // END OF COMPONENT DID UPDATE

  componentWillUnmount() {

    closeCall({self,closeCall});
  }

  createOffer = () => {
    const {sendOffer}= this.props
    createOffer({self:this,sendOffer:({offer})=>{
      sendOffer({offer})
    },
   offerError:({error})=>{
    this.setState({error})
   }})
  }


  createAnswer = () => {
    const { offer,sendAnswer } = this.props
    createAnswer({ offer, self: this,sendAnswer:({answer})=>{
      sendAnswer({answer})
    },answerError:({error})=>{
      this.setState({error})
    } })
  }



  render() {
    const {
      localMediaStream,
      remoteMediaStream,
      connectionState,
      signalingState,
      error,
    } = this.state;

    const { offer, answer, children } = this.props;


    if (children && this.rtcPeerConnection) return children({
      localMediaStream,
      remoteMediaStream,
      rtcPeerConnection: this.rtcPeerConnection,
      error,
      createOffer: this.createOffer,
      createAnswer: this.createAnswer,
      connectionState,
      signalingState,
      closeCall: this.closeCall,
      offer,
      answer,
    });

    return <div data-testid="rtc">Loading...</div>;
  }
}

VideoChatControllerWebRTC.propTypes = {
  sendOffer: PropTypes.func.isRequired,
  sendAnswer: PropTypes.func.isRequired,
  sendCandidate: PropTypes.func.isRequired,
  sendClose: PropTypes.func.isRequired,
  offer: PropTypes.object,
  answer: PropTypes.object,
  candidate: PropTypes.object,
  children: PropTypes.func.isRequired,
};


export default VideoChatControllerWebRTC