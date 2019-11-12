import React from 'react'
import io from "socket.io-client"
class AnonymousToken extends React.Component{
            state={token:null}
  async  componentWillMount(){
        const {username}= this.props
        try {
            const response = await fetch('/anonymous', {
                method: 'POST',
                body: JSON.stringify({ username}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
                this.setState({token:data.token})
            console.log("token recieved",data)
        } catch (error) {
            console.log("error....", error)
        }
    }

    componentDidMount(){
     
    
    }

    componentDidUpdate(){
        console.log("component will update",this.state)
        if(this.state.token !==null){
            this.socket = io(`http://localhost:3000`,{ query: `token=${this.state.token}` });
            this.socket.on('error',(error)=>{
                console.log("error from socket",error)
            })
            this.socket.on('connect',()=>{
                console.log("connected",this.socket)
            })
            console.log("sock...............",this.socket)
        }
    }

    render(){
            const {children}=this.props
            console.log("sock...",this.socket)
        if(this.socket !==undefined && this.socket !==null){
            console.log("sock",this.socket)
            return children({socket:this.socket}) 
        }
   else

            return <div>L.....</div>
        }
}

export default AnonymousToken