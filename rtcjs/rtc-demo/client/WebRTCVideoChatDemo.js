import React from 'react'
import VideoChatModuleWebRTC from '@rtcjs/videochat-module-webrtc'
import DeviceContainer, { DevicesView } from './DevicesView'
import { LocalMediaStream } from '@rtcjs/videochat-display-components'
import ViewSwithcer from './CodeNav'
const WebRTCMessagingDemo = () => {

    return (
        <LocalMediaStream>
            {({ localMediaStream }) => {
                return (
                    <div>
                        <DeviceContainer>{({ selected }) => {
                            return (
                                <div>
                                    <div style={{ textAlign: "center", margin: 10 }}> <h6 style={{ backgroundColor: "#b2dfdb" }}>WebRTC VideoChat Module.</h6>Developed by using ReactJS,MondoDB,Expressjs,WebRTC,SocketIO as a signaling service</div>
                                    <div style={{ display: "flex", justifyContent: "center", zoom: "0.3" }}>
                                        <DevicesView deviceType={selected} >
                                            <VideoChatModuleWebRTC localMediaStream={localMediaStream} initiator={true} serverUrl="http://localhost:3000/" name="mario@gmail.com" targetName="dragos@gmail.com" />
                                        </DevicesView>
                                        <DevicesView deviceType={selected} >
                                            <VideoChatModuleWebRTC localMediaStream={localMediaStream} serverUrl="http://localhost:3000/" name="dragos@gmail.com" targetName="mario@gmail.com" />
                                        </DevicesView>
                                    </div>
                                </div>
                            )
                        }}
                        </DeviceContainer>
                    </div>
                )
            }}
        </LocalMediaStream>
    )
}

//export default WebRTCMessagingDemo

const DemoView =()=>{
    return (<ViewSwithcer>{({selected})=>{
        return(<div className="container">
            {selected===0 && <WebRTCMessagingDemo/> }
            {<h3 hidden={selected===0} >WebRTCVideoChatModule</h3>}
            {<pre hidden={selected===0} data-src="./videochat-module-webrtc/WebRTCVideoChatModule.js"  ></pre>}
            {<h3 hidden={selected===0} >WebRTCSignaling Component</h3>}
            {<pre hidden={selected===0} data-src="./rtcjs-webrtc-signaling/WebRTCSignaling.js" ></pre>}
            {<h3 hidden={selected===0} >WebRTCVideoChatController Component</h3>}
            {<pre hidden={selected===0} data-src="./videochat-controller-webrtc/index.js"></pre>}
            {<h3 hidden={selected===0} >WebRTCVideoChatDisplayer Component</h3>}
            {<pre hidden={selected===0} data-src="./videochat-displayer/index.js"></pre>}
            {<h3 hidden={selected===0} >WebRTCVideoChatControlDisplayer Component</h3>}
            {<pre hidden={selected===0} data-src="./videochat-control-displayer/index.js"></pre>}
            {<h3 hidden={selected===0} >shareable-webrtc: closeCall func</h3>}
            {<pre hidden={selected===0} data-src="./shareables-webrtc/closeCall.js"></pre>}
            {<h3 hidden={selected===0} >shareable-webrtc: createAnswer func</h3>}
            {<pre hidden={selected===0} data-src="./shareables-webrtc/createAnswer.js"></pre>}
            {<h3 hidden={selected===0} >shareable-webrtc: createOffer func</h3>}
            {<pre hidden={selected===0} data-src="./shareables-webrtc/createOffer.js"></pre>}
            {<h3 hidden={selected===0} >shareable-webrtc: destroyRTC func</h3>}
            {<pre hidden={selected===0} data-src="./shareables-webrtc/destroyRTC.js"></pre>}
            {<h3 hidden={selected===0} >shareable-webrtc: initialState</h3>}
            {<pre hidden={selected===0} data-src="./shareables-webrtc/initialState.js"></pre>}
            {<h3 hidden={selected===0} >shareable-webrtc: rtcStateUpdate func</h3>}
            {<pre hidden={selected===0} data-src="./shareables-webrtc/rtcStateUpdate.js"></pre>}
            {<h3 hidden={selected===0} >shareable-webrtc: STUN servers obj</h3>}
            {<pre hidden={selected===0} data-src="./shareables-webrtc/servers.js"></pre>}
            {<h3 hidden={selected===0} >shareable-webrtc: useDataChannel func</h3>}
            {<pre hidden={selected===0} data-src="./shareables-webrtc/useDataChannel.js"></pre>}
            {<h3 hidden={selected===0} >shareable-webrtc: useMediaStream func</h3>}
            {<pre hidden={selected===0} data-src="./shareables-webrtc/useMediaStream.js"></pre>}
        
        </div>)
    }}</ViewSwithcer>)
}

export default DemoView


