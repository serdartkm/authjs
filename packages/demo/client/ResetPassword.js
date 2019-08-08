import React from 'react'
import { EmailPasswordContext } from '@authjs/mern-react'
import CustomInput from './CustomInput'


const ResetPassword = () => {
    return (<EmailPasswordContext.Consumer>{({ password, confirm, resetPassword, validation }) => {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6">
                        <fieldset>
                            <legend>Reset Password:</legend>
                            <CustomInput placeholder="New Password" name="password" type="password" value={password} onChange={onChange} validation={{ ...validation.password }} label="New Password" />
                            <CustomInput placeholder="Confirm Password" name="confirm" type="password" value={confirm} onChange={onChange} validation={{ ...validation.password }} label="Confirm" />

                            <div>
                                <button className="btn btn-primary" onClick={resetPassword}>Reset Password</button>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    }}</EmailPasswordContext.Consumer>)
}

export default ResetPassword