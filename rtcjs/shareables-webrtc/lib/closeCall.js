const  closeCall = ({self,sendClose}) => {
    if (self.rtcPeerConnection) {
        sendClose();
      self.rtcPeerConnection.close();
      self.rtcPeerConnection.onicecandidate = null;
      self.rtcPeerConnection.onconnectionstatechange = null;
      self.rtcPeerConnection.oniceconnectionstatechange = null;
      self.rtcPeerConnection.onicegatheringstatechange = null;
      self.rtcPeerConnection.onsignalingstatechange = null;
      self.rtcPeerConnection.ondatachannel = null;
      self.rtcPeerConnection = null;
    }
  };


  export default closeCall