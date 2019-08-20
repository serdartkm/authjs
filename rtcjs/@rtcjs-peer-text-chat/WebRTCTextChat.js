import React from "react";
import withChatLog from '@rtcjs/chat-log'
class WebRTCTextChat extends React.Component {
  state = { message: "" };
  componentDidMount() {}

  sendMessage = () => {
    console.log("sending Message from webRTC");
  };
  onTextChange(e) {
    const value = e.target.value
    this.setState({ message:value });
  }
  render() {
    const { children,messages } = this.props;
    const { message } = this.state;
    return (
      <div>
        {children({
          messages,
          sendMessage: this.sendMessage,
          onTextChange: this.onTextChange,
          message
        })}
      </div>
    );
  }
}

export default withChatLog(WebRTCTextChat);
