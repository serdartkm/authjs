import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Login from './Login'
import SignUp from './Signup'
import AuthState from './AuthState'
const App = () => {
    return <div>
        <Router>
            <nav style={{ display: "flex", justifyContent: "space-around" }}>
               <AuthState/>
               
            </nav>
            <Route path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
        </Router>
    </div>
}

export default App