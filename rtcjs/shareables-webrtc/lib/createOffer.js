const createOffer = ({self,sendOffer,offerError}) => {
  console.log("create offer initialized")
    self.rtcPeerConnection
      .createOffer()
      .then(offer => {
        console.log("offer created--", offer)
        self.rtcPeerConnection.setLocalDescription(offer);
        sendOffer({ offer: self.rtcPeerConnection.localDescription });
      })
      .catch(error => {
        console.log("error---", error)
        offerError({error})
      });
  };


  export default createOffer