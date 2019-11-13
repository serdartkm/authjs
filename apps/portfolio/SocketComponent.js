import React from 'react'
import io from "socket.io-client"


class SocketComponent extends React.Component {
    state = { token: null, socket: null }
    async  componentWillMount() {

        const { username } = this.props
        try {
            const response = await fetch(`${REACT_APP_SOCKET_URL}/anonymous`, {
                method: 'POST',
                body: JSON.stringify({ username }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
         
            this.socket = io(REACT_APP_SOCKET_URL, { query: `token=${data.token}` });
            this.socket.on('error', (error) => {
                console.log("error from socket", error)
            })
            this.socket.on('connect', () => {
                console.log("connected", this.socket)
            })

            this.setState({ socket: this.socket })
        } catch (error) {
            console.log("error....", error)
        }
    }

    render() {
        const { children } = this.props
    
        if (this.state.socket !== null) {

            return children({ socket: this.state.socket })
        }
        else

            return <div>L.....</div>
    }
}

export default SocketComponent