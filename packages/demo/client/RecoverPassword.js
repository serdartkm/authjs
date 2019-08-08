import React from 'react'
import { EmailPasswordContext } from '@authjs/mern-react'
import CustomInput from './CustomInput'


const RecoverPassword = () => {
    return (
        <EmailPasswordContext.Consumer>{({ email, onChange, validation, recover }) => {
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-6">
                            <fieldset>
                                <legend>Recover Password:</legend>
                                <CustomInput placeholder="Email Address" name="email" type="email" value={email} onChange={onChange} validation={{ ...validation.email }} label="Email Address" />
                                <div><button className="btn btn-primary" onClick={recover}>Recover Password</button></div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            )
        }}</EmailPasswordContext.Consumer>
    )
}

export default RecoverPassword