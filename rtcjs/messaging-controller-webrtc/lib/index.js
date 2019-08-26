import React from 'react'
import withChatLog from "@rtcjs/chat-log";
import { createOffer, useDataChannel, rtcStateUpdate, initialState } from '@rtcjs/shareables-webrtc'


class MessagingControllerWebRTC extends React.Component {
  state = { ...initialState }

  componentDidMount() {
    const { name, initiator = false, sendCandidate, sendOffer } = this.props
    this.props.loadFromStorage({ key: name })

    useDataChannel({
      self: this,
      onMessage: (e) => {
        const { message, datetime, name } = JSON.parse(e.data)
        this.props.saveRemoteMessage({
          from: name,
          message,
          datetime,
          key: this.props.name,
          to: this.props.name
        })
      },
      sendCandidate,
    })

    if (initiator) {
      createOffer({
        self: this, sendOffer
      })
    }
  }

  componentWillUpdate(nextProps) {
    rtcStateUpdate({ self: this, nextProps, ...this.props, autoAnswer: true })
  } // END OF COMPONENT DID UPDATE

  sendMessage = () => {


    const { name, targetName } = this.props;
    const { message } = this.props;
    this.dataChannel.send(JSON.stringify({
      name,
      targetName,
      message,
      datetime: new Date().getTime()
    }))

    this.props.saveLocalMessage({ key: name, to: targetName })
  }

  render() {
    const { children, messages, message } = this.props
    return children({ ...this.state, messages, message, sendMessage: this.sendMessage, onTextChange: this.props.onTextChange })

  }
}

export default withChatLog(MessagingControllerWebRTC)