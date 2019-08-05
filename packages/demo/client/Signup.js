import React from 'react'
import EmailPassword from '@authjs/mern-react'
import {EmailPasswordContext} from '@authjs/mern-react'
class SignUp extends React.Component {
        static contextType= EmailPasswordContext
    state = { email: "", password: "" }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
    }

    signup =()=>{
        const {email,password}= this.state
        this.context.signup({username:email,password})
    }

    render() {
            const {email,password}=this.state
        return (<div>SignUp
         
               <div>
                    <div>
                        <input onChange={this.onChange} value={email} name="email" type="text" placeholder="Enter Email" />
                    </div>
                    <div>
                        <input onChange={this.onChange} value={password} name="password" type="password" placeholder="Enter Password" />
                    </div>
                    <div>
                        <button onClick={this.signup}>Sign Up</button>
                    </div>
                </div>
            
        </div>)
    }
}

export default SignUp