
import servers from './servers'

const useMediaStream = ({ self,
    gotLocalMedia,
    gotMediaError,
    mediaConfig = { video: true, audio: false },
    onCandidate,
    onConnectionState,
    onSignalingState,
    onAddStream
}) => {
    self.rtcPeerConnection = new RTCPeerConnection(servers);

   const gotLocalMediaStream = localMediaStream => {
       console.log("MediaStream Created",localMediaStream)
        gotLocalMedia({ localMediaStream })
        // self.setState({ localMediaStream: mediaStream });
        localMediaStream
            .getVideoTracks()
            .forEach(t => self.rtcPeerConnection.addTrack(t, localMediaStream));
    };
  const  handleLocalMediaStreamError = error => {
        gotMediaError({ error })
    };
    navigator.mediaDevices
        .getUserMedia(mediaConfig)
        .then(gotLocalMediaStream)
        .catch(handleLocalMediaStreamError);

    self.rtcPeerConnection.onicecandidate = e => {
        console.log("onicecandidate------",e)
        if(e.candidate !==null){
            onCandidate(e)
        }
       
    };
  
    self.rtcPeerConnection.onconnectionstatechange = () => {
        console.log("connectionState-----!!!!!",self.rtcPeerConnection.connectionState)
        onConnectionState({ connectionState: self.rtcPeerConnection.connectionState })
    };

    self.rtcPeerConnection.onsignalingstatechange = () => {
        onSignalingState({ signalingState: self.rtcPeerConnection.signalingState })
    };

    self.rtcPeerConnection.onaddstream = e => {
        console.log("remote media-------",e)
      //  self.setState({ remoteStream: e.stream });
        onAddStream({ remoteMediaStream: e.stream })
    };
}


export default useMediaStream