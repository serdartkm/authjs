import React from 'react'
import validate from '@authjs/validation'
export const EmailPasswordContext = React.createContext()

const initValidation = {
    email: { isValid: true, message: "" },
    password: {
        isValid: true, message: ""
    }
}
class EmailPasswordProvider extends React.Component {
    state = { loading: false, token: "", isLoggedIn: false, email: "", password: "", confirm: "", serverError: "", validation: initValidation }
    componentWillMount() {
        if (this.loggedIn()) {
            this.setState({ isLoggedIn: true })
        }
    }
    setToken = ({ token }) => {
        this.setState({ token })
    }
    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
        this.resetValidation()
    }
    resetValidation = () => {
        this.setState({ validation: initValidation })
    }
    recoverPassword = () => {
        const { email } = this.state
        const validationResult = validate({ email })
        this.setState({ validation: { ...validationResult } })
        if (!validationResult.email.isValid) {

            return
        }
        this.setState({ loading: true })
        return this.fetch(`/recover`, {
            method: "POST",
            body: JSON.stringify({ email })
        }).then(res => {
            if(res.validation.email.isValid){
                this.setState({validation:{...res.validation}})
            }
            // Setting the token in localStorage
            return Promise.resolve(res);
        }).catch((error) => {
            this.setState({ serverError:error })
        })
    }
    resetPassword = () => {
        const { password, token } = this.state
        const validationResult = validate({ password })
        this.setState({ validation: { ...validationResult } })
        if (!validationResult.password.isValid) {

            return
        }
        this.setState({ loading: true })
        return this.fetch(`/change`, {
            method: "POST",
            body: JSON.stringify({ password, token })
        }).then(res => {
            console.log("change pass----", res)
            this.setState({ message: res })
            return Promise.resolve(res);
        }).catch((error) => {
            this.setState({ error })

        })
    }

    signup = () => {
        const { email, password } = this.state
        const validationResult = validate({ email, password })
        this.setState({ validation: { ...validationResult } })
        //Client side validation
        if (!validationResult.email.isValid | !validationResult.password.isValid) {

            return
        }
        this.setState({ loading: true })
        return this.fetch(`/signup`, {
            method: "POST",
            body: JSON.stringify({ email, password })
        }).then(res => {
            //Server side validation
            if (res.token === undefined) {
                this.setState({ validation: { ...res.validation } })
                return
            }

            this.setState({ isLoggedIn: true })
            this.setToken(res.token); // Setting the token in localStorage
            return Promise.resolve(res);
        }).catch((error) => {
            this.setState({ serverError: error })
        })
    }
    login = () => {
        const { email, password } = this.state
        const validationResult = validate({ email, password })
        this.setState({ validation: { ...validationResult } })
        //Client side validation
        if (!validationResult.email.isValid | !validationResult.password.isValid) {

            return
        }
        // Get a token from api server using the fetch api
        this.setState({ loading: true })
        return this.fetch(`/log-in`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            //Server side validation
            if (res.token === undefined) {
                this.setState({ validation: { ...res.validation } })
                return
            }
            this.setState({ isLoggedIn: true })
            this.setToken(res.token); // Setting the token in localStorage
            return Promise.resolve(res);
        }).catch((error) => {
            console.log("error login---....", error)
            this.setState({ serverError: error })
        })
    }
    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // Getting token from localstorage
        return !!token && !this.isTokenExpired(token); // handwaiving here
    };

    isTokenExpired = token => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                // Checking if token is expired.
                return true;
            } else return false;
        } catch (error) {
            this.setState({ error })

            return false;
        }
    };

    setToken = idToken => {
        // Saves user token to localStorage
        localStorage.setItem("id_token", idToken);
    };

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem("id_token");
    };

    logout = () => {
        this.setState({ isLoggedIn: false, username: "", error: "", message: "" })
        // Clear user token and profile data from localStorage
        localStorage.removeItem("id_token");
    };

    getConfirm = () => {
        // Using jwt-decode npm package to decode the token
        let answer = decode(this.getToken());
        console.log("Recieved answer!");
        return answer;
    };

    fetch = (url, options) => {
        // performs api calls sending the required authentication headers
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers["Authorization"] = "Bearer " + this.getToken();
        }
        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json());
    };

    _checkStatus = response => {

        this.setState({ loading: false })
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {

            // Success status lies between 200 to 300
            return response;
        } else {

            var error = new Error(response.statusText);
            this.setState({ error })
            error.response = response;
            throw error;
        }
    };

    render() {
        const { children } = this.props
        const { loading, isLoggedIn, email, password, validation } = this.state
        return (<EmailPasswordContext.Provider value={{
            login: this.login,
            isLoggedIn,
            loggedIn: this.loggedIn,
            logout: this.logout,
            loading,
            signup: this.signup,
            resetPassword: this.resetPassword,
            recoverPassword: this.recoverPassword,
            email,
            password,
            onChange: this.onChange,
            validation,
            resetValidation: this.resetValidation,
            setToken: this.setToken
        }}>
            <div>{children}</div>
        </EmailPasswordContext.Provider>
        )
    }
}

export default EmailPasswordProvider