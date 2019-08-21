import React from 'react'

import { createAnswer, createOffer, useMediaStream, rtcStateUpdate, initialState } from '@rtcjs/shareables-webrtc'

class VideoChatControllerWebRTC extends React.Component {

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
    // this.closeCall({self:this})
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
const {closeConnection,children} =this.props
    if (children && closeConnection)
      return children({
        ...this.state,
        ...this.props,
        rtcPeerConnection: null,
        createOffer: this.createOffer,
        createAnswer: this.createAnswer,
        closeCall: this.closeCall,
      })
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

export default VideoChatControllerWebRTC