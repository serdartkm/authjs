import React from 'react'
import MessageEditor from './MessageEditor'
import MessagesView from './MessagesView'
import Login from './Login'
class TextChatContainer extends React.Component {
    _isMounted = false;
    state = { message: "", messages: [], connected: false, errors: [],username:"", loggedIn:false }

    componentDidMount() {
        this._isMounted = true;

   
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
        this.webSocket = new WebSocket(`ws://localhost:3000`)


        this.webSocket.onmessage = (data) => {
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

        this.webSocket.onopen = () => {
            console.log("connected")
            if(this._isMounted)
         
            this.setState({ connected: true })
        }

        this.webSocket.onclose = () => {
            if(this._isMounted)
            this.setState({ connected: false })
        }

        this.webSocket.onerror = (error) => {
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
        if(this._isMounted)
        this.setState({ message: "" })
    }
    render() {
        const { message, connected, errors, messages,loggedIn,username } = this.state

        if(loggedIn)
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