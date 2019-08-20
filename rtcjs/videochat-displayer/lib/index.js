import React from 'react'
import { LocalVideo,RemoteVideo,CallView} from '@rtcjs/videochat-display-components'
import VideoChatControlDisplayer from '@rtcjs/videochat-control-displayer'
const VideoChatDisplayer =({offer,signalingState,remoteMediaStream,localMediaStream,connectionState,createOffer,createAnswer,closeCall})=>{
console.log("connectionState----<<<<<....",connectionState)
    return(<div style={{flex:7,position:"relative"}}>
       
        {true&& <LocalVideo localMediaStream={localMediaStream}/>}
        {connectionState==="connected"&& <RemoteVideo remoteMediaStream={remoteMediaStream}/>}
        {<CallView offer={offer} signalingState={signalingState}/>}
        <VideoChatControlDisplayer offer={offer} createAnswer={createAnswer} createOffer={createOffer} closeCall={closeCall} connectionState={connectionState}/>
      
    </div>)
}


export default VideoChatDisplayer