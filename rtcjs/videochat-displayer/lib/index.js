import React from 'react'
import { LocalVideo,RemoteVideo,CallView} from '@rtcjs/videochat-display-components'
import VideoChatControlDisplayer from '@rtcjs/videochat-control-displayer'
const VideoChatDisplayer =({offer,signalingState,remoteMediaStream,localMediaStream,connectionState,createOffer,createAnswer,closeCall,closeConnection})=>{

    return(<div style={{flex:7,position:"relative"}}>
       
        {true&& <LocalVideo closeConnection={closeConnection} localMediaStream={localMediaStream}/>}
        {signalingState==="stable"&& <RemoteVideo remoteMediaStream={remoteMediaStream}/>}
        {<CallView closeConnection={closeConnection} offer={offer} signalingState={signalingState}/>}
        <VideoChatControlDisplayer offer={offer} createAnswer={createAnswer} createOffer={createOffer} closeCall={closeCall} signalingState={signalingState}/>
      
    </div>)
}


export default VideoChatDisplayer