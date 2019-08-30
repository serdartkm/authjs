import React from 'react'
import VideoChatModuleWebRTC from '@rtcjs/videochat-module-webrtc'
import DeviceContainer, { DevicesView } from './DevicesView'
import { LocalMediaStream } from '@rtcjs/videochat-display-components'
import TabBar from './TabBar'
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
                                    <div style={{ display: "flex", justifyContent: "center"}}>
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
        return(<div className="container" >
            {selected===0 && <WebRTCMessagingDemo/> }

            {selected===1 && <TabBar>{({selectedTab})=>{
                return(<div className="line-numbers">
            {<h6 hidden={selectedTab===1} >-----------------------------FRONT END CODE---------------------------</h6>}
            {<h3 hidden={selectedTab===1} >WebRTCVideoChatModule</h3>}
            {<pre  hidden={selectedTab===1} data-src="./videochat-module-webrtc/WebRTCVideoChatModule.js"  ></pre>}
            {<h3 hidden={selectedTab===1} >WebRTCSignaling Component</h3>}
            {<pre hidden={selectedTab===1} data-src="./rtcjs-webrtc-signaling/WebRTCSignaling.js" ></pre>}
            {<h3 hidden={selectedTab===1} >WebRTCVideoChatController Component</h3>}
            {<pre hidden={selectedTab===1} data-src="./videochat-controller-webrtc/index.js"></pre>}
            {<h3 hidden={selectedTab===1} >WebRTCVideoChatDisplayer Component</h3>}
            {<pre hidden={selectedTab===1} data-src="./videochat-displayer/index.js"></pre>}
            {<h3 hidden={selectedTab===1} >WebRTCVideoChatControlDisplayer Component</h3>}
            {<pre hidden={selectedTab===1} data-src="./videochat-control-displayer/index.js"></pre>}
            {<h3 hidden={selectedTab===1} >shareable-webrtc: closeCall func</h3>}
            {<pre hidden={selectedTab===1} data-src="./shareables-webrtc/closeCall.js"></pre>}
            {<h3 hidden={selectedTab===1} >shareable-webrtc: createAnswer func</h3>}
            {<pre hidden={selectedTab===1} data-src="./shareables-webrtc/createAnswer.js"></pre>}
            {<h3 hidden={selectedTab===1} >shareable-webrtc: createOffer func</h3>}
            {<pre hidden={selectedTab===1} data-src="./shareables-webrtc/createOffer.js"></pre>}
            {<h3 hidden={selectedTab===1} >shareable-webrtc: destroyRTC func</h3>}
            {<pre hidden={selectedTab===1} data-src="./shareables-webrtc/destroyRTC.js"></pre>}
            {<h3 hidden={selectedTab===1} >shareable-webrtc: initialState</h3>}
            {<pre hidden={selectedTab===1} data-src="./shareables-webrtc/initialState.js"></pre>}
            {<h3 hidden={selectedTab===1} >shareable-webrtc: rtcStateUpdate func</h3>}
            {<pre hidden={selectedTab===1} data-src="./shareables-webrtc/rtcStateUpdate.js"></pre>}
            {<h3 hidden={selectedTab===1} >shareable-webrtc: STUN servers obj</h3>}
            {<pre hidden={selectedTab===1} data-src="./shareables-webrtc/servers.js"></pre>}
            {<h3 hidden={selectedTab===1} >shareable-webrtc: useDataChannel func</h3>}
            {<pre hidden={selectedTab===1} data-src="./shareables-webrtc/useDataChannel.js"></pre>}
            {<h3 hidden={selectedTab===1} >shareable-webrtc: useMediaStream func</h3>}
            {<pre hidden={selectedTab===1} data-src="./shareables-webrtc/useMediaStream.js"></pre>}
            {<h6 hidden={selectedTab===0} >-----------------------------BACK END CODE------------------------------</h6>}
            {<h3 hidden={selectedTab===0} >Express js server for initializing web server</h3>}
            {<pre  hidden={selectedTab===0} data-src="./server/index.js" data-line="6,13" data-line-offset></pre>}
            {<h3 hidden={selectedTab===0} >rtcjs-server middleware for socketio communication management</h3>}
            {<pre  hidden={selectedTab===0} data-src="./rtcjs-server/index.js"  data-line-offset></pre>}
            {<h3 hidden={selectedTab===0} >rtcjs-server-webrtc-signaling middleware for webrtc signaling management</h3>}
            {<pre  hidden={selectedTab===0} data-src="./rtcjs-server-webrtc-signaling/index.js"  data-line-offset></pre>}
                </div>)
            }}</TabBar>}
        
        </div>)
    }}</ViewSwithcer>)
}

export default DemoView


