import React from 'react'
import WebRTCFileShareController from '@rtcjs/fileshare-controller-webrtc'
import { FileDownloader, FileSelector } from '@rtcjs/fileshare-controls-displayer'
import WebRTCSignaling from '@rtcjs/webrtc-signaling'

const ConnectionState=({signalingState})=>{
    if(signalingState==="stable"){
        return <div style={{color:"white",backgroundColor:"#81c784"}}>connected</div>
    }
    else{
        return <div style={{color:"white",backgroundColor:"red"}}>not connected</div>
    }
}
class WebRTCFileShareModule extends React.Component {
    render() {

        const {serverUrl,name,targetName,initiator}= this.props
        return (<WebRTCSignaling
        
                serverUrl={serverUrl} name={name} targetName={targetName}>{(signalingContext) => {
                return (
                    <WebRTCFileShareController
                    initiator={initiator}
                        name={name}
                        targetName={targetName}
                        {...signalingContext}
                    >{(fileshareControllerContext) => {
                        return (<div>FileShareModule
                            <ConnectionState {...fileshareControllerContext}/>
                            <FileDownloader {...fileshareControllerContext} {...signalingContext} />
                            <FileSelector {...fileshareControllerContext} {...signalingContext} />
                        </div>)
                    }}</WebRTCFileShareController>
                )
            }}</WebRTCSignaling>)
    }

}

export default WebRTCFileShareModule


/* 

import React from 'react'
import WebRTCFileShareController from '@rtcjs/fileshare-controller-webrtc'
import { FileDownloader, FileSelector } from '@rtcjs/fileshare-controls-displayer'
import WebRTCSignaling from '@rtcjs/webrtc-signaling'
class WebRTCFileShareModule extends React.Component {
    render() {
        return (<WebRTCSignaling
        
            serverUrl={serverUrl} name={name} targetName={targetName}>{(signalingContext) => {
                return (
                    <WebRTCFileShareController
                        name={name}
                        targetName={targetName}
                        {...signalingContext}
                    >{(videoChatControllerContext) => {
                        return (<div>
                            <FileDownloader {...videoChatControllerContext} {...signalingContext} />
                            <FileSelector {...videoChatControllerContext} {...signalingContext} />
                        </div>)
                    }}</WebRTCFileShareController>
                )
            }}</WebRTCSignaling>)
    }

}

export default WebRTCFileShareModule
*/