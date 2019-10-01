<h4 style={{ textAlign: "center", margin: 10 }}>Messaging Module (with SocketIO)</h4>
import MessagingModule from '../../messaging-module'
import io from "socket.io-client";
import DeviceContainer, { DevicesView } from './DevicesView'
import './minimal-devices/css/iphone.css'
const serverURL = ENV ==="development" ? "http://localhost:3000/" : "https://portfolio-2024.herokuapp.com/"
const firstUser = io(serverURL, { query: `name=mario@gmail.com` });
const secondUser = io(serverURL, { query: `name=dragos@gmail.com` });
class SocketMessagingDemo extends React.Component {

    render() {
        return (
            <DeviceContainer>{({ selected }) => {
                console.log(ENV ==="development")
                return (
                    <div>
                        <div style={{ textAlign: "center", margin: 10 }}> <h6 style={{backgroundColor:"#ffecb3"}}>SocketIO Messaging Module.</h6>Developed by using ReactJS,MondoDB,Expressjs,SocketIO</div>
                        <div style={{ display: "flex", justifyContent: "center", zoom: "0.3" }}>
                            <DevicesView deviceType={selected} user="mario@gmail.com">
                                <MessagingModule socket={firstUser} name="mario@gmail.com" targetName="dragos@gmail.com" />
                            </DevicesView>
                            <DevicesView deviceType={selected} user="dragos@gmail.com">
                                <MessagingModule socket={secondUser} name="dragos@gmail.com" targetName="mario@gmail.com" />
                            </DevicesView>
                        </div>
                    </div>
                )
            }}

            </DeviceContainer>
        )
    }
}

export default SocketMessagingDemo



/*
<h6 style={{ textAlign: "center", margin: 10 }}>Developed by using ReactJS,MondoDB,Expressjs,SocketIO</h6>import React from 'react'

*/