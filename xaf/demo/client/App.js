import React from 'react'
import { BrowserRouter as Router,HashRouter, Route, Link } from 'react-router-dom'
import Login,{SignUp,RecoverPassword,RecoverResult,ResetPassword,Users} from '@authjs/react-ui'
import Home from './Home'
import NavBar from './NavBar'
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
            <Route path="/resetpass/:username/:token" component={ResetPassword}/>
        </HashRouter>
    </div>
}

export default App