import React from 'react'
import {EmailPasswordContext} from '@authjs/mern-react'
class Login extends React.Component {
    static contextType = EmailPasswordContext;
    state = { email: "", password: "" }
 
    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
    }
    login=()=>{
        const {email,password}=this.state
        this.context.login({username:email,password})
    }
    logout=()=>{
        this.context.logout()
    }
    render() {
        const { email, password } = this.state
        return (<div>Login <div>
                    <div>
                        <input onChange={this.onChange} value={email} name="email" type="text" placeholder="Enter Email" />
                    </div>
                    <div>
                        <input onChange={this.onChange} value={password} name="password" type="password" placeholder="Enter Password" />
                    </div>
                    <div>
                        <button onClick={this.login}>Login</button>
                    </div>
                </div>

        </div>)
    }

}

export default Login