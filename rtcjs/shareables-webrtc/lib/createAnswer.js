import servers from './servers'
const createAnswer = ({ offer, self, sendAnswer }) => {

  if (self.rtcPeerConnection === null) {
    self.rtcPeerConnection = new RTCPeerConnection(servers);
  }
  self.rtcPeerConnection
    .setRemoteDescription(new RTCSessionDescription(offer))
    .then(() => self.rtcPeerConnection.createAnswer())
    .then(answer => {
      self.rtcPeerConnection.setLocalDescription(answer);
      sendAnswer({ answer });
    })
    .catch(error => {
     self.setState((prevState)=>({errors:[...prevState.errors,error]}))
    });
};

export default createAnswer