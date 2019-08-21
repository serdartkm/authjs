import React from 'react'
import VideoChatControllerWebRTC from '@rtcjs/videochat-controller-webrtc'
import WebRTCSignaling from '@rtcjs/webrtc-signaling'
import VideoChatDisplayer from '@rtcjs/videochat-displayer'

const ConnectionState = ({signalingState,offer }) => {
  
    if (signalingState === "stable") {
        return <div style={{ color: "white", backgroundColor: "#81c784" }}>connected</div>
    }
    if(signalingState==="have-local-offer"){
        return <div style={{ color: "#000000", backgroundColor: "#81c784" }}>Waiting for answer...</div>
    }
    if(offer){
        return <div style={{ color: "#000000", backgroundColor: "#4fc3f7" }}>Please click answer button....</div>
    }
    else {
        return <div style={{ color: "#000000", backgroundColor: "#ff8f00" }}>Please  Click Call Button</div>
    }
}
const VideoChatModuleWebRTC = ({ name, targetName, serverUrl,localMediaStream }) => {

    return (
        <WebRTCSignaling serverUrl={serverUrl} name={name} targetName={targetName}>{({ sendOffer, sendAnswer, sendCandidate, offer, answer,closeConnection, candidate, sendClose }) => {
            return (
                <VideoChatControllerWebRTC
                   localMediaStream={localMediaStream}
                    sendClose={sendClose}
                    name={name}
                    targetName={targetName}
                    closeConnection={closeConnection}
                    offer={offer}
                    answer={answer}
                    candidate={candidate}
                    sendOffer={sendOffer}
                    sendAnswer={sendAnswer}
                    sendCandidate={sendCandidate}>{({offer, createOffer,createAnswer,closeCall, connectionState,localMediaStream,remoteMediaStream,signalingState }) => {
             
                        return (<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                            <ConnectionState offer={offer} signalingState={signalingState}/>
                            <VideoChatDisplayer closeConnection={closeConnection} signalingState={signalingState} offer={offer} connectionState={connectionState} localMediaStream={localMediaStream} remoteMediaStream={remoteMediaStream} createOffer={createOffer} createAnswer={createAnswer} closeCall={closeCall} />
                           
                        </div>)
                    }}</VideoChatControllerWebRTC>
            )
        }}</WebRTCSignaling>

    )
}

export default VideoChatModuleWebRTC
