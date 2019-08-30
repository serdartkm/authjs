import React from 'react'
import MessagingModuleWebRTC from '@rtcjs/messaging-module-webrtc'
import DeviceContainer, { DevicesView } from './DevicesView'
const WebRTCMessagingDemo =()=>{

    return (
        <DeviceContainer>{({ selected }) => {

            return (
                <div>
                    <div style={{ textAlign: "center", margin: 10 }}> <h6 style={{backgroundColor:"#b2dfdb"}}>WebRTC Messaging Module.</h6>Developed by using ReactJS,MondoDB,Expressjs,WebRTC,SocketIO as a signaling service</div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <DevicesView deviceType={selected} user="mario@gmail.com">
                        <MessagingModuleWebRTC initiator={true} serverUrl="http://localhost:3000/"  name="mario@gmail.com" targetName="dragos@gmail.com" />
                        </DevicesView>
                        <DevicesView deviceType={selected} user="dragos@gmail.com">
                        <MessagingModuleWebRTC serverUrl="http://localhost:3000/"  name="dragos@gmail.com" targetName="mario@gmail.com" />
                        </DevicesView>
                    </div>
                </div>
            )
        }}

        </DeviceContainer>
    )
}

export default WebRTCMessagingDemo


