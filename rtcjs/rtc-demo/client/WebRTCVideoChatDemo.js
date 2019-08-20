import React from 'react'
import VideoChatModuleWebRTC from '@rtcjs/videochat-module-webrtc'
import DeviceContainer, { DevicesView } from './DevicesView'
const WebRTCMessagingDemo =()=>{

    return (
        <DeviceContainer>{({ selected }) => {
            return (
                <div>
                    <div style={{ textAlign: "center", margin: 10 }}> <h6 style={{backgroundColor:"#b2dfdb"}}>WebRTC VideoChat Module.</h6>Developed by using ReactJS,MondoDB,Expressjs,WebRTC,SocketIO as a signaling service</div>
                    <div style={{ display: "flex", justifyContent: "center", zoom: "0.3"  }}>
                        <DevicesView deviceType={selected} >
                        <VideoChatModuleWebRTC initiator={true} serverUrl="http://localhost:3000/"  name="mario@gmail.com" targetName="dragos@gmail.com" />
                        </DevicesView>
                        <DevicesView deviceType={selected} >
                        <VideoChatModuleWebRTC serverUrl="http://localhost:3000/"  name="dragos@gmail.com" targetName="mario@gmail.com" />
                        </DevicesView>
                    </div>
                </div>
            )
        }}

        </DeviceContainer>
    )
}

export default WebRTCMessagingDemo

/*
<div>
        <h4 style={{ textAlign: "center", margin: 10 }}>Messaging Module (with WebRTC)</h4>
                <h6 style={{ textAlign: "center", margin: 10 }}>Developed by using ReactJS,MondoDB,Expressjs,SocketIO as a signaling service</h6>
                <div style={{ display: "flex", justifyContent: "space-between" }}>

                    <div style={{ flex: 1, marginRight: 2 }}>user: mario@gmail.com
                    <MobileView>
                    <MessagingModuleWebRTC initiator={true} serverUrl="http://localhost:3000/"  name="mario@gmail.com" targetName="dragos@gmail.com" />
                    </MobileView>
                      
                    </div>
                    <div style={{ flex: 1, marginLeft: 2 }}>user: dragos@gmail.com
                    
                    <MobileView>
                    <MessagingModuleWebRTC serverUrl="http://localhost:3000/"  name="dragos@gmail.com" targetName="mario@gmail.com" />

                    </MobileView>
                       
                    </div>
                </div>
    </div>
*/

const MobileView =({children})=>{
    return (
<div className="md-iphone-5 md-black-device md-glare">
   <div className="md-body">

      <div className="md-buttons"></div>

      <div className="md-front-camera"></div>
      <div className="md-top-speaker"></div>
      <div className="md-screen">
          {children}
      </div>

      <button className="md-home-button"></button>
  </div>
</div>
        
    )
}