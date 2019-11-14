import {h,Component} from 'preact'
import io from "socket.io-client"


class SocketComponent extends Component {
    state = { token: null, socket: null,connected:false }
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
               this.setState({connected:true})
            })

            this.setState({ socket: this.socket })
        } catch (error) {
            console.log("error....", error)
        }
    }

    render() {
        const { children } = this.props
        const{connected}=this.state
    

            return children({ socket: this.state.socket,connected })
        
 
    }
}

export default SocketComponent