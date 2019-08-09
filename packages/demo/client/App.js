import React from 'react'
import { BrowserRouter as Router,HashRouter, Route, Link } from 'react-router-dom'
import Login,{SignUp,RecoverPassword,RecoverResult,ResetPassword,Users} from '@authjs/react-ui-bootstrap'
import AuthState from './AuthState'
import Home from './Home'

const App = () => {
    return <div>
        <HashRouter>
            <nav style={{ display: "flex", justifyContent: "space-around" }}>
               <AuthState/>
               <Link to="/useradmin">Users</Link>
            </nav>
            <Route path="/useradmin" component={Users}/>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/recover" component={RecoverPassword}/>
            <Route path="/resetpass/:username/:token" component={ResetPassword}/>
        </HashRouter>
    </div>
}

export default App