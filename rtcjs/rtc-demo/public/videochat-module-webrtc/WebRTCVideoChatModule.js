import React from 'react'
import WebRTCVideoChatController from '@rtcjs/videochat-controller-webrtc'
import WebRTCSignaling from '@rtcjs/webrtc-signaling'
import VideoChatDisplayer from '@rtcjs/videochat-displayer'

class  WebRTCVideoChatModule  extends React.Component {
state={reset:false}

resetWebRTCConrtoller=()=>{
this.setState({reset:true})

setTimeout(()=>{
this.setState({reset:false})
},0)
}
render(){

const { name, targetName, serverUrl, localMediaStream }= this.props
const {reset}= this.state
if(!reset)
    return (
        <WebRTCSignaling
          resetWebRTCConrtoller={this.resetWebRTCConrtoller}
         serverUrl={serverUrl} name={name} targetName={targetName}>{(signalingContext) => {
            return (
                <WebRTCVideoChatController
                
                    localMediaStream={localMediaStream}
                    name={name}
                    targetName={targetName}
                    {...signalingContext}
                >{(videoChatControllerContext) => {
                    return (<VideoChatDisplayer {...videoChatControllerContext} {...signalingContext} />)
                }}</WebRTCVideoChatController>
            )
        }}</WebRTCSignaling>

    )

    return null
}
}
export default WebRTCVideoChatModule
