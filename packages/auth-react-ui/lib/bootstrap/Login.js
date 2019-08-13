import React from 'react'
import { EmailPasswordContext } from '@authjs/react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import {BootstrapInput} from '@xaf/bootstrap-input'

import BootstrapAsyncButton from '@xaf/bootstrap-async-button'
const Login =()=>{
    return (<EmailPasswordContext.Consumer>
        {({email,password,login,onChange,validation,isLoggedIn,loading})=>{
            if(!isLoggedIn)
            return(
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6">
                        <fieldset>
                            <legend>Login:</legend>
                            <BootstrapInput placeholder="Email Address" name="email" type="email" value={email} onChange={onChange} validation={{ ...validation.email }} label="Email Address" />
                            <BootstrapInput placeholder="Password" name="password" type="password" value={password} onChange={onChange} validation={{ ...validation.password }} label="Password" />
                            <div>
                           <BootstrapAsyncButton title="Login" onClick={login} loading={loading}/>
                            </div>
                            <Link to="/recover">Forgot Password !</Link>
                        </fieldset>
                    </div>
                </div>
            </div>
            )
            return <Redirect to="/" />
        }}
    </EmailPasswordContext.Consumer>)
}


export default Login