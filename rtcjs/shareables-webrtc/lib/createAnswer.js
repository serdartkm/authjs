const createAnswer = ({ offer,self,sendAnswer,answerError }) => {
 
    self.rtcPeerConnection
      .setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => self.rtcPeerConnection.createAnswer())
      .then(answer => {
        console.log("answer created", answer)
        self.rtcPeerConnection.setLocalDescription(answer);
        sendAnswer({ answer: self.rtcPeerConnection.localDescription });
      })
      .catch(error => {
        answerError({error})
      });
  };

  export default createAnswer