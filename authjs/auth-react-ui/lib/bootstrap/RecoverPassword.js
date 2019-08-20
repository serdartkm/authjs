import React from 'react'
import { EmailPasswordContext } from '@authjs/react'
import {BootstrapInput} from '@xaf/bootstrap-input'
import BootstrapAsyncButton from '@xaf/bootstrap-async-button'
const RecoverPassword = () => {
    return (
        <EmailPasswordContext.Consumer>{({ email, onChange, validation, recover,loading }) => {
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-6">
                            <fieldset>
                                <legend>Recover Password:</legend>
                                <BootstrapInput placeholder="Email Address" name="email" type="email" value={email} onChange={onChange} validation={{ ...validation.email }} label="Email Address" />
                                <div><BootstrapAsyncButton title="Recover Password" onClick={recover} loading={loading}/></div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            )
        }}</EmailPasswordContext.Consumer>
    )
}

export default RecoverPassword