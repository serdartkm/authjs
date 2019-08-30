const  closeCall = ({self}) => {

    if (self.rtcPeerConnection) {
   
     
         
          self.rtcPeerConnection.ontrack = null;
          self.rtcPeerConnection.onremovetrack = null;
          self.rtcPeerConnection.onremovestream = null;
          self.rtcPeerConnection.onicecandidate = null;
          self.rtcPeerConnection.oniceconnectionstatechange = null;
          self.rtcPeerConnection.onsignalingstatechange = null;
          self.rtcPeerConnection.onicegatheringstatechange = null;
          self.rtcPeerConnection.onnegotiationneeded = null;
          self.rtcPeerConnection.onconnectionstatechange =null;
          self.rtcPeerConnection.ondatachannel =null
          self.rtcPeerConnection.close();
          self.rtcPeerConnection = null;
    
      
       
      }
  
    
  };
  export default closeCall