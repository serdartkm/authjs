import React from 'react'
import {isValid,initialValidationState} from '@authjs/validation'
import axios from 'axios'
export const EmailPasswordContext = React.createContext()



class EmailPasswordProvider extends React.Component {
    state = { loading: false, token: "", isLoggedIn: false, email: "", password: "", confirm: "", serverError: "", validation: initialValidationState }
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
        this.setState({ validation: initialValidationState })
    }
    recoverPassword = () => {
        const { email } = this.state
      //  const validationResult = validate({ email })
      //  this.setState({ validation: { ...validationResult } })
        if (isValid({email})(this)) {
        this.setState({ loading: true })
        return axios.post('/recover', { email })
            .then(response => {
                const { data } = response
                this.setState({loading:false})
                if (data.validation.email.isValid) {
                    this.setState({ validation: { ...data.validation } })
                }
            })
            .catch(error => {
                this.setState({ serverError: error,loading:false })
            })
        }
    }

    resetPassword = () => {
        const { password, token } = this.state
        if (isValid({password})(this)) {
        this.setState({ loading: true })
        return axios.post('/change', { password, token })
            .then(response => {
                const { data } = response
                this.setState({ message: data,loading:false })
            })
            .catch(error => {
                this.setState({ serverError: error,loading:false })
            })
        }
    }

    signup = () => {
        const { email, password } = this.state
        if (isValid({email,password})(this)) {
            console.log("is valid ------", email,password)
        this.setState({ loading: true })
        return axios.post('/signup', { email, password })
            .then(response => {
                const { data } = response
                //Server side validation
                if (data.token === undefined) {
                    this.setState({ validation: { ...data.validation },loading:false })
                    return
                }
                this.setState({ isLoggedIn: true,loading:false })
                this.setToken(data.token); // Setting the token in localStorage
            }).catch(error => {
                this.setState({ serverError: error,loading:false })
            })
    }
    else {
        console.log("is not valid ------", email,password)
        return
    }

}

    login = () => {
        const { email, password } = this.state
        if (isValid({email,password})(this)) {
            console.log("is valid ------", email,password)
        // Get a token from api server using the fetch api
        this.setState({ loading: true })

        return axios.get('/log-in', {
            params: {
                email,
                password
            }
        }).then((response) => {
            const { data } = response
            console.log("axios response", response)
            //Server side validation
            if (data.token === undefined) {
                this.setState({ validation: { ...data.validation },loading:false })
                return
            }
            this.setState({ isLoggedIn: true,loading:false })
            this.setToken(data.token); // Setting the token in localStorage

        }).catch((error) => {
            this.setState({ serverError: error,loading:false })
        })
    }else{
        console.log("is not valid ------", email,password)
    }
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


    render() {
        const { children } = this.props
        const { loading, isLoggedIn, email, password, validation, confirm } = this.state
        return (<EmailPasswordContext.Provider value={{
            login: this.login,
            isLoggedIn,
            logout: this.logout,
            loading,
            signup: this.signup,
            resetPassword: this.resetPassword,
            recoverPassword: this.recoverPassword,
            email,
            password,
            confirm,
            onChange: this.onChange,
            validation,
            setToken: this.setToken
        }}>
            <div>{children}</div>
        </EmailPasswordContext.Provider>
        )
    }
}

export default EmailPasswordProvider