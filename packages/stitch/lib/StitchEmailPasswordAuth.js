import React, { Component } from 'react'

class StitchEmailPasswordAuth extends Component {
    state = {
        client: null, emailPassClient: null,
        //LoginSignUp
        loggingIn: false,
        signingUp: false,

        //ConfirmingEmail
        confirmingEmail: false,


        //SendingEmail
        sendingEmail: false,


        resendingConfirmationEmail: false,
        resendingConfirmationEmailResult: null,

        //  sendingResetPasswordRequest: false,
        // passwordResetRequestmessage: null,

        //Resetting Password

        resettingPassword: false,


        //LoggingOut
        loggingOut: false,
        loggedOut: true,

        //Common
        success: false,
        successMessage: "",
        user: null,
        error: false,
        errorMessage: ""
    }
    componentWillMount() {

        const { appId } = this.props
        client = stitch.Stitch.initializeDefaultAppClient(appId);

        const emailPassClient = stitch.Stitch.defaultAppClient.auth.getProviderClient(stitch.UserPasswordAuthProviderClient.factory);

        this.setState({ client, emailPassClient })

    }

    handleLogIn = (email, password) => {
        const { client } = this.state;

        this.setState({ ...inilialState, loggingIn: true })
        return client.auth.loginWithCredential(new stitch.UserPasswordCredential(email, password)).then((user) => {
            PubSub.publish('login', user.profile.data.email);
            this.setState({ loggingIn: false, loggedOut: false, user, success: true, successMessage: `Hello,${user.profile.data.email}` })
            this.props.history.push("/")
        }).catch((error) => {
            this.setState({ ...inilialState, loggingIn: false, error: true, errorMessage: error.message })
        })
    }

    handlesignUp = (email, password) => {
        const { emailPassClient } = this.state

        this.setState({ ...inilialState, signingUp: true })
        return emailPassClient.registerWithEmail(email, password)
            .then((user) => {

                this.setState({ ...inilialState, signingUp: false, loggedOut: false, success: true, successMessage: "Look into your email for confirmation, please!", user })
            })
            .catch(error => {
                this.setState({ ...inilialState, signingUp: false, error: true, errorMessage: error.message })
            });
    }

    handleConfirmEmail = (token, tokenId) => {
        const { emailPassClient } = this.state

        this.setState({ ...inilialState, confirmingEmail: true })
        return emailPassClient.confirmUser(token, tokenId).then(() => {

            this.setState({ ...inilialState, confirmingEmail: false, success: true, successMessage: "Successfully confirmed!" })
        }).catch((error) => {
            this.setState({ ...inilialState, confirmingSignUp: false, error: true, errorMessage: error.message })
        })

    }

    handleResendConfirmationEmail = (email) => {
        const { emailPassClient } = this.state

        this.setState({ ...inilialState, sendingEmail: true })

        return emailPassClient.resendConfirmationEmail(email).then(() => {

            this.setState({ ...inilialState, sendingEmail: false, success: true, successMessage: "Look into your mailbox ,please!" })

        }).catch((error) => {
            this.setState({ ...inilialState, sendingEmail: false, error: true, errorMessage: error.message })

        })

    }


    handleSendResetPasswordRequest = (email) => {
        const { emailPassClient } = this.state

        this.setState({ ...inilialState, sendingEmail: true })

        return emailPassClient.sendResetPasswordEmail(email).then((result) => {
            console.log("handleSendResetPasswordRequest result", result)
            this.setState({ ...inilialState, sendingEmail: false, success: true, successMessage: "Look into your mail box, please !" })
        }).catch(error => {
            this.setState({ ...inilialState, sendingEmail: false, error: true, errorMessage: error.message })
        });

    }

    handleResetPassword = (token, tokenId, newPassword) => {

        const { emailPassClient } = this.state

        this.setState({ ...inilialState, resettingPassword: true })

        return emailPassClient.resetPassword(token, tokenId, newPassword).then((result) => {
            console.log("result", result)
            this.setState({ ...inilialState, resettingPassword: false, success: true, successMessage: "Your password has been reset" })
        }).catch(error => {
            this.setState({ ...inilialState, resettingPassword: false, error: true, errorMessage: error.message })
        });

    }

    handleLogOut = (msg, data) => {

    

        const { client } = this.context

        this.setState({ ...inilialState, loggingOut: true })

        return client.auth.logout().then(() => {
            this.setState({ ...inilialState, loggingOut: false, loggedOut: true })
            this.props.history.push("/")
        }).catch((error) => {
            this.setState({ ...inilialState, loggingOut: false, loggedOut: false, error: true, errorMessage: error.message })
        })

    }


    render() {
        return this.props.children({
            handleSendResetPasswordRequest: this.handleSendResetPasswordRequest,
            handleResendConfirmationEmail: this.handleResendConfirmationEmail,
            handleConfirmEmail: this.handleConfirmEmail,
            handleResetPassword: this.handleResetPassword,
            handlesignUp: this.handlesignUp,
            handleLogIn: this.handleLogIn,
            state: { ...this.state }
        })
    }
}

export default StitchEmailPasswordAuth