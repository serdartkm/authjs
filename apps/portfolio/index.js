import React from 'react'
//import Modules from './modules'
// import jwt from 'jsonwebtoken'
import io from "socket.io-client"
import MessageModuleSocket from '../../rtcjs/messaging-module-socket'

class AppTwo extends React.Component {
    state = { tokenMario: null, tokenDragos: null }
      componentDidMount() {
        // const tokenMario = await jwt.sign({ data: "mario" }, "secret", { expiresIn: '1h' })
        // const tokenDragos = await jwt.sign({ data: "dragos" }, "secret", { expiresIn: '1h' })
        // this.clientOne = await io(tokenMario, "one");
        // this.clientTwo = await io(tokenDragos, "two");
        // this.setState({ tokenDragos, tokenMario })
    }
    render() {
        const { tokenDragos, tokenMario } = this.state
        if (tokenDragos !== null && tokenMario !== null) {
            <div>
                {/* <MessagingModuleSocket id={1} name="mario" targetName="dragos" socket={this.clientOne} />
                <MessagingModuleSocket id={1} name="dragos" targetName="mario" socket={this.clientTwo} /> */}
            </div>
        }

        return <div>Loading</div>
    }

}

ReactDOM.render(
    <AppTwo />,
    document.getElementById('root')
);