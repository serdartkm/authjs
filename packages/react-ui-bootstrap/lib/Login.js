import React from 'react'
import { EmailPasswordContext } from '@authjs/mern-react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import CustomInput from './CustomInput'

const Login =()=>{
    return (<EmailPasswordContext.Consumer>
        {({email,password,login,onChange,validation,isLoggedIn})=>{
            if(!isLoggedIn)
            return(
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6">
                        <fieldset>
                            <legend>Login:</legend>
                            <CustomInput placeholder="Email Address" name="email" type="email" value={email} onChange={onChange} validation={{ ...validation.email }} label="Email Address" />
                            <CustomInput placeholder="Password" name="password" type="password" value={password} onChange={onChange} validation={{ ...validation.password }} label="Password" />
                            <div>
                                <button type='submit' className="btn btn-primary" onClick={login}>Login</button>
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