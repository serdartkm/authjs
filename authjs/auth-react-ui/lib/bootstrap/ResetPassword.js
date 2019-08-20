import React from 'react'
import { EmailPasswordContext } from '@authjs/react'
import {BootstrapInput} from '@xaf/bootstrap-input'
import BootstrapAsyncButton from '@xaf/bootstrap-async-button'

const ResetPassword = () => {
    return (<EmailPasswordContext.Consumer>{({ password, confirm, resetPassword, validation,loading }) => {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6">
                        <fieldset>
                            <legend>Reset Password:</legend>
                            <BootstrapInput placeholder="New Password" name="password" type="password" value={password} onChange={onChange} validation={{ ...validation.password }} label="New Password" />
                            <BootstrapInput placeholder="Confirm Password" name="confirm" type="password" value={confirm} onChange={onChange} validation={{ ...validation.password }} label="Confirm" />
                            <div>
                           <BootstrapAsyncButton title="Reset Password" onClick={resetPassword} loading={loading}/>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    }}</EmailPasswordContext.Consumer>)
}

export default ResetPassword