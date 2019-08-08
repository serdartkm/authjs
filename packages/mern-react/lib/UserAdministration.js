import React from 'react'
export const UserAdminContext = React.createContext()
class UserAdministration extends React.Component {

    state = { users: [] }
    componentDidMount() {
        console.log("UserAdministration loaded")
        this.getUsers()
    }
    getUsers = () => {
        return this.fetch(`/users`, {
            method: "GET"
        }).then(res => {
            this.setState({users:res.users})
            return Promise.resolve(res);
        }).catch((error) => {
            console.log("error login---....", error)
            this.setState({ serverError: error })
        })
    }

    findUser = (id) => {

    }

    updateUser = () => {

    }

    deleteUser = (id) => {

    }

    fetch = (url, options) => {
        // performs api calls sending the required authentication headers
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
  
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
        return (
            <div>{children({ getUsers: this.getUsers, findUser: this.findUser, deleteUser: this.deleteUser, updateUser: this.updateUser })}</div>
        )
    }

}

export default UserAdministration