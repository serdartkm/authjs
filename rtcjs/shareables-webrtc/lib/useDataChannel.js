
import servers from './servers'

const useDataChannel =({self,
    onMessage,
    onClose,
    onError,
    onCandidate,
    onSignalingStateChange,
    onConnectionState
    })=> {
    self.rtcPeerConnection = new RTCPeerConnection(servers, { optional: [{ RtpDataChannels: true }] });
    self.dataChannel = self.rtcPeerConnection.createDataChannel("channel1", { reliable: true });
    self.dataChannel.onerror = function (error) {
        onError(error)
      console.log("Ooops...error:", error);
    };

    self.dataChannel.onclose = function () {
        console.log("data channel is closed");
        onClose()

      };
    //when we receive a message from the other peer, display it on the screen 
    self.dataChannel.onmessage = function (event) {
      onMessage(event)
     }


     self.rtcPeerConnection.onsignalingstatechange = () => {
        onSignalingStateChange({signalingState:self.rtcPeerConnection.signalingState})
      };
  
      self.rtcPeerConnection.onicecandidate = e => {
       onCandidate(e)
      };
  
      self.rtcPeerConnection.onconnectionstatechange = () => {
        console.log("connectionState---......",self.rtcPeerConnection.connectionState)
      onConnectionState({connectionState: self.rtcPeerConnection.connectionState})
}
}


export default useDataChannel