
import React from 'react'


class WebSocketCodeLab extends React.Component{

    componentDidMount(){

        this.webSocket = new WebSocket("ws://localhost:3000")
        this.webSocket.onopen =()=>{
            console.log("client clonnected")
        }
        this.webSocket.onmessage=(data)=>{
            console.log("data--",data)
        }
    }

    render(){

        return <div>WebSocketCodeLab</div>
    }

}





ReactDOM.render(
    <WebSocketCodeLab />,
    document.getElementById('root')
  );