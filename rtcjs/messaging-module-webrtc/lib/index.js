import React from 'react'
import MessagingControllerWebRTC from '@rtcjs/messaging-controller-webrtc'
import WebRTCSignaling from '@rtcjs/webrtc-signaling'
import MessagesDisplayer from '@rtcjs/messages-displayer'
import MessageEditorDisplayer from '@rtcjs/message-editor-displayer'
const ConnectionState=({signalingState})=>{
    if(signalingState==="stable"){
        return <div style={{color:"white",backgroundColor:"#81c784"}}>connected</div>
    }
    else{
        return <div style={{color:"white",backgroundColor:"red"}}>not connected</div>
    }
}
const MessagingModuleWebRTC = ({ initiator, name, targetName, serverUrl }) => {
////--------
    return (
        <WebRTCSignaling serverUrl={serverUrl} name={name} targetName={targetName}>{({ sendOffer, sendAnswer, sendCandidate, offer, answer, candidate }) => {
            return (
                <MessagingControllerWebRTC
                    initiator={initiator}
                    name={name}
                    targetName={targetName}
                    offer={offer}
                    answer={answer}
                    candidate={candidate}
                    sendOffer={sendOffer}
                    sendAnswer={sendAnswer}
                    sendCandidate={sendCandidate}>{({ message, messages, sendMessage, onTextChange, connectionState,signalingState }) => {
                        return (<div  style={{width:"100%",height:"100%",display:"flex",flexDirection:"column"}}>
                            <ConnectionState  signalingState={signalingState}/>
                            <MessagesDisplayer messages={messages} />
                            <MessageEditorDisplayer disabled={signalingState !=="stable"} message={message} sendMesage={sendMessage} onTextChange={onTextChange} />
                        </div>)
                    }}</MessagingControllerWebRTC>
           )
        }}</WebRTCSignaling>

    )
}

export default MessagingModuleWebRTC
