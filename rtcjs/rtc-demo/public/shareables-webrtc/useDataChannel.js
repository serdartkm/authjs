
import servers from './servers'

const useDataChannel = ({ self,
  onMessage,
  sendCandidate,
}) => {
  self.rtcPeerConnection = new RTCPeerConnection(servers, { optional: [{ RtpDataChannels: true }] });
  self.dataChannel = self.rtcPeerConnection.createDataChannel("channel1", { reliable: true });
  self.dataChannel.onerror = function (error) {
    self.setState((prevState)=>({errors:[...prevState.errors,error]}))

  };

  self.dataChannel.onclose = function () {

 self.setState({closeConnection:true})

  };
  //when we receive a message from the other peer, display it on the screen 
  self.dataChannel.onmessage = function (event) {
    onMessage(event)
  }


  self.rtcPeerConnection.onsignalingstatechange = () => {
    self.setState({ signalingState: self.rtcPeerConnection.signalingState })
  };

  self.rtcPeerConnection.onicecandidate = e => {
    if (e.candidate !== null) {
      const {candidate}=e
      sendCandidate({candidate})
  }
  };

  self.rtcPeerConnection.onconnectionstatechange = () => {

    self.setState({ connectionState: self.rtcPeerConnection.connectionState })
  }
}


export default useDataChannel