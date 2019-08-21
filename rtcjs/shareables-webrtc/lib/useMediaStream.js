
import servers from './servers'

const useMediaStream = ({ self,
    mediaConfig = { video: true, audio: false },
   sendCandidate,
    mediaStream = null
}) => {
    self.rtcPeerConnection = new RTCPeerConnection(servers);
    const gotLocalMediaStream = localMediaStream => {

   
        self.setState({ localMediaStream });
        localMediaStream
            .getVideoTracks()
            .forEach(t => self.rtcPeerConnection.addTrack(t, localMediaStream));
    };
    const handleLocalMediaStreamError = error => {
        self.setState((prevState)=>({errors:[...prevState.errors,error]}))
    };
    if (mediaStream === null) {
        navigator.mediaDevices
            .getUserMedia(mediaConfig)
            .then(gotLocalMediaStream)
            .catch(handleLocalMediaStreamError);
    }
    else {

        mediaStream
            .getVideoTracks()
            .forEach(t => self.rtcPeerConnection.addTrack(t, mediaStream));
            self.setState({ localMediaStream:mediaStream });
    }

    self.rtcPeerConnection.onicecandidate = e => {

        if (e.candidate !== null) {
            const {candidate}=e
            sendCandidate({candidate})
        }

    };

    self.rtcPeerConnection.onconnectionstatechange = () => {

        self.setState({ connectionState: self.rtcPeerConnection.connectionState })
    };

    self.rtcPeerConnection.onsignalingstatechange = () => {

        self.setState({ signalingState: self.rtcPeerConnection.signalingState })
    };

    self.rtcPeerConnection.ontrack = e => {
       
         self.setState({ remoteMediaStream: e.streams[0] });

    };
}


export default useMediaStream