import React from 'react'
import WebRTCFileShareController from '@rtcjs/fileshare-controller-webrtc'
import { FileDownloader, FileSelector } from '@rtcjs/fileshare-controls-displayer'
import FileShareDisplayer from '@rtcjs/fileshare-displayer'
import WebRTCSignaling from '@rtcjs/webrtc-signaling'

const ConnectionState=({signalingState})=>{
    if(signalingState==="stable"){
        return <div style={{color:"white",backgroundColor:"#81c784"}}>connected</div>
    }
    else{
        return <div style={{color:"white",backgroundColor:"red"}}>not connected</div>
    }
}
const WebRTCFileShareModule =({serverUrl,name,targetName,initiator})=>{

        return (<WebRTCSignaling
        
                serverUrl={serverUrl} name={name} targetName={targetName}>{(signalingContext) => {
                return (
                    <WebRTCFileShareController
                    initiator={initiator}
                        name={name}
                        targetName={targetName}
                        {...signalingContext}
                    >{(fileshareControllerContext) => {
                
                        return (<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column"}}>
                            <ConnectionState {...fileshareControllerContext}/>
                            <FileShareDisplayer {...signalingContext} {...fileshareControllerContext}  />
                    
                        </div>)
                    }}</WebRTCFileShareController>
                )
            }}</WebRTCSignaling>)
    }


export default WebRTCFileShareModule


