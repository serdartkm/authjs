import React from 'react'
import { BrowserRouter as Router,HashRouter, Route, Link } from 'react-router-dom'
import Login from './Login'
import SignUp from './Signup'
import AuthState from './AuthState'
import ResetPassword from './ResetPassword'
import RecoverPassword from './RecoverPassword'
import Home from './Home'
import Users from './Users'
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