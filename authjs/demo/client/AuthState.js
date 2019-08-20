import React from 'react'
import { EmailPasswordContext } from '@authjs/mern-react'
import { NavLink } from 'react-router-dom'
const AuthState = () => {
    return <EmailPasswordContext.Consumer>{({ isLoggedIn, logout }) => {
            console.log("isloggedIn",isLoggedIn)
        return <div>{isLoggedIn ? <NavLink to="/" onClick={logout}>LogOut</NavLink> : <div><NavLink to="/login">Login</NavLink><NavLink to="/signup">SignUp</NavLink></div>}</div>
    }}
    </EmailPasswordContext.Consumer>
}

export default AuthState