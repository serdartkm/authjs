import React from 'react'
import { BrowserRouter as Router,HashRouter, Route, Link } from 'react-router-dom'
import Login,{SignUp,RecoverPassword,RecoverResult,ResetPassword,Users} from '@authjs/react-ui'
import Home from './Home'
import NavBar from './NavBar'
import SocketMessagingDemo from './SocketMessagingDemo'
import WebRTCMessagingDemo from './WebRTCMessaingDemo'
import WebRTCVideoChatDemo from './WebRTCVideoChatDemo'
import DemoPrizm from './DemoPrizm'
import {CodeLab,Education,Modules,Projects} from '../../../portfolio/index'
const App = () => {
    return <div>
        <HashRouter>
            <nav style={{ display: "flex", justifyContent: "space-around" }}>
            <NavBar/>
            </nav>
            <Route exact path="/" component={Home} />
            <Route path="/users" render={()=><Users collection="users" db ="demo"/>}/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/recover" component={RecoverPassword}/>
            <Route path="/socketmessaging" component={SocketMessagingDemo}/>
            <Route path="/webrtcmessaging" component={WebRTCMessagingDemo}/>
            <Route path ="/webrtcvideochat" component={WebRTCVideoChatDemo}/>
            
            <Route path ="/codelab" component={CodeLab}/>
            <Route path ="/certification" component={Education}/>
            <Route path ="/modules" component={Modules}/>
            <Route path ="/projects" component={Projects}/>
            <Route path ="/prizm" component={DemoPrizm}/>
            <Route path="/resetpass/:username/:token" component={ResetPassword}/>
        </HashRouter>
    </div>
}

export default App