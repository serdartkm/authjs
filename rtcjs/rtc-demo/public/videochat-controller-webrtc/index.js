import React from 'react'

import { createAnswer, createOffer, useMediaStream, rtcStateUpdate, initialState, destroyRTC } from '@rtcjs/shareables-webrtc'

class WebRTCVideoChatController extends React.Component {

  state = { ...initialState };

  componentDidMount() {

    const { sendCandidate } = this.props
    useMediaStream({
      self: this,
      sendCandidate,
      mediaStream: this.props.localMediaStream
    })
  } // End of componentDidMount

  componentWillUpdate(nextProps) {
    rtcStateUpdate({ self: this, nextProps, ...this.props })

  } // END OF COMPONENT DID UPDATE

  componentWillUnmount() {
     destroyRTC({self:this})
  }
  createOffer = () => {
    const { sendOffer } = this.props
    createOffer({ self: this, sendOffer })
  }


  closeCall = () => {
    this.props.sendClose()

  }

  createAnswer = () => {
    const { offer, sendAnswer } = this.props
    createAnswer({ offer, self: this, sendAnswer })
  }

  render() {
const {children} =this.props
    
    if (children) return children({
      ...this.state,
      ...this.props,
      rtcPeerConnection: this.rtcPeerConnection,
      createOffer: this.createOffer,
      createAnswer: this.createAnswer,
      closeCall: this.closeCall,

    });

    return <div data-testid="rtc">Loading...</div>;
  }
}

export default WebRTCVideoChatController