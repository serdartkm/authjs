import React from 'react'
import { EmailPasswordContext } from '@authjs/mern-react'
import CustomInput from './CustomInput'
import {Redirect} from 'react-router-dom'
const SignUp = () => {
    return (
        <EmailPasswordContext.Consumer>{({ onChange, email, password, signup, validation, isLoggedIn }) => {
          if(!isLoggedIn)
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-6">
                            <fieldset>
                                <legend>Sign Up:</legend>
                                <CustomInput placeholder="Email Address" name="email" type="email" value={email} onChange={onChange} validation={{ ...validation.email }} label="Email Address" />
                                <CustomInput placeholder="Password" name="password" type="password" value={password} onChange={onChange} validation={{ ...validation.password }} label="Password" />
                                <div>
                                    <button className="btn btn-primary" onClick={signup}>Sign Up</button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            )
            return <Redirect to="/" />
        }}</EmailPasswordContext.Consumer>
    )
}

export default SignUp