import React from 'react'
import axios from 'axios'
//import Modules from './modules'

import io from "socket.io-client"
import MessageModuleSocket from '../../rtcjs/messaging-module-socket'

class AppTwo extends React.Component {
    state = { tokenMario: null, tokenDragos: null }
    async componentDidMount() {

        const response = await fetch('/anonymous', {
            method: 'POST',
            body: JSON.stringify({ username: "mario" }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        this.setState({ tokenMario: data })
        this.clientOne = await io(data, "one");
    }
    render() {
        const { tokenDragos, tokenMario } = this.state
        if (this.clientOne) {
            return (<div>
                <MessageModuleSocket id={1} name="mario" targetName="dragos" socket={this.clientOne} />
                {/* <MessagingModuleSocket id={1} name="dragos" targetName="mario" socket={this.clientTwo} /> */}
            </div>)
        }
        return <div>Loading</div>
    }
}

ReactDOM.render(
    <AppTwo />,
    document.getElementById('root')
);