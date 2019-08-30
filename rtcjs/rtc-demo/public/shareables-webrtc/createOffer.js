import servers from './servers'
const createOffer = ({ self, sendOffer }) => {
  if (self.rtcPeerConnection === null) {
    self.rtcPeerConnection = new RTCPeerConnection(servers);
  }
  self.rtcPeerConnection
    .createOffer()
    .then(offer => {
     
      self.rtcPeerConnection.setLocalDescription(offer);
      sendOffer({ offer });
    })
    .catch(error => {

      self.setState((prevState)=>({errors:[...prevState.errors,error]}))
    });
};

export default createOffer