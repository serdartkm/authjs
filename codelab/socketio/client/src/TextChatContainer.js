import React from 'react'
import MessageEditor from './MessageEditor'
import MessagesView from './MessagesView'
import Login from './Login'
import io from 'socket.io-client'
class TextChatContainer extends React.Component {
    _isMounted = false;
    state = { message: "", messages: [], connected: false, errors: [],username:"", loggedIn:false }

    componentDidMount() {
        this._isMounted = true;

   this.initWebSocket()
    }

    onChange = (e) => {
        const value = e.target.value
        const name =e.target.name
        this.setState({ [name]: value })
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    initWebSocket=()=>{
        this.io = io(`ws://localhost:3000`)
    

        this.io.onmessage = (data) => {
            const message = JSON.parse(data.data)
            console.log("message",message)
            try {
                const { text, user } = message
                if(this._isMounted)
                this.setState((prevState) => ({ messages: [...prevState.messages, { text, user }] }))
            } catch (error) {
                    console.log("error",error)
            }
        }

        this.io.on('connect',()=>{
            console.log("connected")
            this.io.emit("text_message","hello")
            if(this._isMounted)
         
            this.setState({ connected: true })
        }) 

        this.io.onclose = () => {
            if(this._isMounted)
            this.setState({ connected: false })
        }

        this.io.onerror = (error) => {
            console.log("Error",error)
            if(this._isMounted)
            this.setState((prevState) => ({ errors: [...prevState.errors, error.message] }));

        }

   
        
    }

     login = async()=>{
        const {username}= this.state
        try {
            const response = await fetch("http://localhost:3000/login",
            {body: JSON.stringify({username}), method: 'POST', headers: {
                'Content-Type': 'application/json'

              },})
            const result = await response.text()
         this.setState({loggedIn:true})
           this.initWebSocket()

        } catch (error) {
            if(this._isMounted)
           this.setState((prevState)=>({errors:[...prevState.errors,error.message]}))
       
        }

     
    }

    sendMessage = () => {
        const {message}= this.state
        if(this._isMounted){
            this.setState({ message: "" })
            this.io.emit("text_message", message)
        }
      
    }
    render() {
        const { message, connected, errors, messages,loggedIn,username } = this.state

        if(true)
        return (<div>
            <div>Connection state: {connected ? <div style={{ color: "green" }}>connnected</div> : <div style={{ color: "red" }}>not connected</div>}</div>
            <div style={{color:"red"}}>{errors.length > 0 &&
                errors.map((error, i) => {
                    return <div key={i}>{error}</div>
                })
            }</div>
            <MessagesView messages={messages} />
            <MessageEditor connected={connected} onChange={this.onChange} message={message} sendMessage={this.sendMessage} />
        </div>)

        return <Login onChange={this.onChange} login ={this.login} username={username}/>

    }
}


export default TextChatContainer