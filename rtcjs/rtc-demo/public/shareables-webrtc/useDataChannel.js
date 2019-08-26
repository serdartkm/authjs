import servers from './servers'

const useDataChannel = ({ self,
  onMessage,
  sendCandidate,
}) => {
  self.rtcPeerConnection = new RTCPeerConnection(servers);
  self.dataChannel = self.rtcPeerConnection.createDataChannel("channel1", { reliable: true });

  self.rtcPeerConnection.ondatachannel = (event) => {

    var receiveChannel = event.channel;
    receiveChannel.onmessage = function (event) {
     // console.log("Got Data Channel Message:", typeof( event.data));
      try {
        onMessage(event)
      } catch (error) {
        console.log("OnMessage error--",error)
      }
  
    };


    receiveChannel.onerror = function (error) {
      self.setState((prevState) => ({ errors: [...prevState.errors, error] }))

    };

    receiveChannel.onclose = function () {

      self.setState({ closeConnection: true })

    };
    //when we receive a message from the other peer, display it on the screen 

  }




  self.rtcPeerConnection.onsignalingstatechange = () => {
    self.setState({ signalingState: self.rtcPeerConnection.signalingState })
  };

  self.rtcPeerConnection.onicecandidate = e => {
    if (e.candidate !== null) {
      const { candidate } = e
      sendCandidate({ candidate })
    }
  };

  self.rtcPeerConnection.onconnectionstatechange = () => {

    self.setState({ connectionState: self.rtcPeerConnection.connectionState })
  }
}


export default useDataChannel