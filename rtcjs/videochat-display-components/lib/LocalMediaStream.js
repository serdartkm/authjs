import React from 'react';


const mediaStreamConstraints = {
  video: true,
};

class LocalMediaStream extends React.Component {
  state = { localMediaStream: null };

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then(this.gotLocalMediaStream)
      .catch(this.handleLocalMediaStreamError);
  }

  gotLocalMediaStream = mediaStream => {
    this.setState({ localMediaStream: mediaStream });
    //  this.localVideoRef.current.srcObject = mediaStream;
  };

  render() {
    const { localMediaStream } = this.state;
    const { children } = this.props;
    if (localMediaStream !== null) {
  
      return children({ localMediaStream });
    }
    return null;
  }
}

export default LocalMediaStream;
