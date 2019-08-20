import React from 'react'
import { EmailPasswordContext } from '@authjs/react'
import {BootstrapInput} from '@xaf/bootstrap-input'
import {Redirect} from 'react-router-dom'
import BootstrapAsyncButton from '@xaf/bootstrap-async-button'
const SignUp = () => {
    return (
        <EmailPasswordContext.Consumer>{({ onChange, email, password, signup,loading, validation, isLoggedIn }) => {
          if(!isLoggedIn)
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-6">
                            <fieldset>
                                <legend>Sign Up:</legend>
                                <BootstrapInput placeholder="Email Address" name="email" type="email" value={email} onChange={onChange} validation={{ ...validation.email }} label="Email Address" />
                                <BootstrapInput placeholder="Password" name="password" type="password" value={password} onChange={onChange} validation={{ ...validation.password }} label="Password" />
                                <div>
                                    <BootstrapAsyncButton title="SignUp" onClick={signup} loading={loading}/>
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