import React from 'react'
import VideoChatControllerWebRTC from '@rtcjs/videochat-controller-webrtc'
import WebRTCSignaling from '@rtcjs/webrtc-signaling'
import VideoChatDisplayer from '@rtcjs/videochat-displayer'

const ConnectionState = ({ connectionState,signalingState }) => {
    console.log("signalingState------",signalingState)
    if (connectionState === "connected") {
        return <div style={{ color: "white", backgroundColor: "#81c784" }}>connected</div>
    }
    else {
        return <div style={{ color: "white", backgroundColor: "red" }}>not connected{signalingState}</div>
    }
}
const MessagingModuleWebRTC = ({ name, targetName, serverUrl }) => {

    return (
        <WebRTCSignaling serverUrl={serverUrl} name={name} targetName={targetName}>{({ sendOffer, sendAnswer, sendCandidate, offer, answer, candidate, sendClose }) => {
            return (
                <VideoChatControllerWebRTC
                    sendClose={sendClose}
                    name={name}
                    targetName={targetName}
                    offer={offer}
                    answer={answer}
                    candidate={candidate}
                    sendOffer={sendOffer}
                    sendAnswer={sendAnswer}
                    sendCandidate={sendCandidate}>{({offer, createOffer,createAnswer,closeCall, connectionState,localMediaStream,remoteMediaStream,signalingState }) => {
                        console.log("ConnectionState+++++++",connectionState)
                        return (<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                            <ConnectionState connectionState={connectionState}  signalingState={signalingState}/>
                            <VideoChatDisplayer signalingState={signalingState} offer={offer} connectionState={connectionState} localMediaStream={localMediaStream} remoteMediaStream={remoteMediaStream} createOffer={createOffer} createAnswer={createAnswer} closeCall={closeCall} />
                           
                        </div>)
                    }}</VideoChatControllerWebRTC>
            )
        }}</WebRTCSignaling>

    )
}

export default MessagingModuleWebRTC
