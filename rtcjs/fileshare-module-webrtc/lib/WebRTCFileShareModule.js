import React from 'react'
import WebRTCFileShareController from '@rtcjs/fileshare-controller-webrtc'
import FileShareDisplayer from '@rtcjs/fileshare-displayer'
import WebRTCSignaling from '@rtcjs/webrtc-signaling'


class WebRTCFileShareModule extends React.Component {

    state = { visible: "true" }

    resetWebRTCConrtoller = () => {
        this.setState({ visible: "false" })

       setTimeout(() => {
         this.setState({ visible: "true" })
        }, 5000)
    }
    render() {

        const { serverUrl, name, targetName,visible }= this.props

        return (<WebRTCSignaling
            resetWebRTCConrtoller={this.resetWebRTCConrtoller}
            serverUrl={serverUrl} name={name} targetName={targetName}>{(signalingContext) => {
        
                return (
                    <WebRTCFileShareController
               
                        name={name}
                        targetName={targetName}
                        {...signalingContext}
                    >{(fileshareControllerContext) => {

                        return (<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>

                            <FileShareDisplayer {...signalingContext} {...fileshareControllerContext} />

                        </div>)
                    }}</WebRTCFileShareController>
                )
            }}</WebRTCSignaling>)

        

}
}
export default WebRTCFileShareModule


