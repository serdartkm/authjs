
import React from 'react'


class AppOne extends React.Component{

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

        return <div>AppOne</div>
    }

}





ReactDOM.render(
    <AppOne />,
    document.getElementById('root')
  );