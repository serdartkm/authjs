

const compWillUpdate =({self, nextProps,createAnswer,answer,offer,candidate})=>{
  //  console.log("nextProps", nextProps)
    if (nextProps.answer !== null && answer === null) {
    //  console.log("answer----", nextProps.answer)
      self.rtcPeerConnection.setRemoteDescription(
        new RTCSessionDescription(nextProps.answer)
      );
    }
    if (nextProps.offer !== null && offer === null && createAnswer) {
      console.log("offer recieved on update------->>>", nextProps.offer)
      const { offer } = nextProps
      createAnswer({ offer,self:self })
    }
    if (
      self.rtcPeerConnection &&
      self.rtcPeerConnection.remoteDescription !== null
    ) {
      if (candidate === null && nextProps.candidate !== null) {
        console.log("candidate-----!!!!!!", nextProps.candidate)
        self.rtcPeerConnection.addIceCandidate(
          new RTCIceCandidate(nextProps.candidate)
        );
      } else if (nextProps.candidate !== null && nextProps.candidate) {
        console.log("candidate-----??????", nextProps.candidate)
        if (
          nextProps.candidate !== undefined &&
          nextProps.candidate !== undefined
        ) {
          self.rtcPeerConnection.addIceCandidate(
            new RTCIceCandidate(nextProps.candidate)
          );
        }
      }
    }
  }

  export default compWillUpdate