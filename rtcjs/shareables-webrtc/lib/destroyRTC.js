const  destroyRTC = ({self}) => {

    if (self.rtcPeerConnection) {
    
      self.rtcPeerConnection.ontrack = null;
      self.rtcPeerConnection.onremovetrack = null;
      self.rtcPeerConnection.onremovestream = null;
      self.rtcPeerConnection.onicecandidate = null;
      self.rtcPeerConnection.oniceconnectionstatechange = null;
      self.rtcPeerConnection.onsignalingstatechange = null;
      self.rtcPeerConnection.onconnectionstatechange =null;
      self.rtcPeerConnection.onicegatheringstatechange = null;
      self.rtcPeerConnection.onnegotiationneeded = null;
      self.rtcPeerConnection = null;
    }
  };
  export default destroyRTC