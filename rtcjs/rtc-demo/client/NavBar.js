import React from 'react'
import { NavLink } from 'react-router-dom'
import { EmailPasswordContext } from '@authjs/react'
const NavBar = () => {
    return (<EmailPasswordContext.Consumer>{({ isLoggedIn, logout }) => {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Authentication Modules
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <NavLink className="nav-link" to="/socketmessaging">Mern Authentication Demo</NavLink>
        <NavLink className="nav-link" to="/webrtcmessaging">Stitch Authentication Demo</NavLink>

          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
                        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Chat Modules
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <NavLink className="nav-link" to="/socketmessaging">SocketIO Messaging Demo</NavLink>
        <NavLink className="nav-link" to="/webrtcmessaging">WebRTC Messaging Demo</NavLink>
        <NavLink className="nav-link" to="/webrtcvideochat">WebRTC Video Chat Demo</NavLink>
        <NavLink className="nav-link" to="/webrtcaudiochat">WebRTC Audio Chat Demo</NavLink>
        <NavLink className="nav-link" to="/webrtcfileshare">WebRTC FileShare Demo</NavLink>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
                        {isLoggedIn && <li className="nav-item">
                            <NavLink className="nav-link" to="/users">Users</NavLink>
                        </li>}

                        {!isLoggedIn && <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>}

                        {
                            isLoggedIn && <li className="nav-item">
                                <NavLink className="nav-link" to="/" onClick={logout}>Logout</NavLink>
                            </li>
                        }

                        {!isLoggedIn && <li className="nav-item">
                            <NavLink className="nav-link" to="/signup">SignUp</NavLink>
                        </li>}

                    </ul>

                </div>
            </nav>
        )
    }}

    </EmailPasswordContext.Consumer>)
}

export default NavBar