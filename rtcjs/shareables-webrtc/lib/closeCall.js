const  closeCall = ({self}) => {

    if (self.rtcPeerConnection) 
     self.rtcPeerConnection.close();
    
  };
  export default closeCall