# `@authjs/mern-react`

> Authentication package with JWT, ReactJS, Node.js, Express.js, MongoDB for ReactJS client.


# `Install`

```
npm install @authjs/mern-react

```
# `Exports`
```
import EmailPasswordProvider,{EmailPasswordContext,UserAdministration} from '@authjs/mern-react'
```
>1. **`<EmailPasswordProvider/>`** provides all required state,props and   functions for user authentication logic like login, registration, password resetting.
>2. **`<EmaiPasswordContext.Consumer/>`**is used for implementing Authentication UI components like `<Login/>`,`<SignUp/>`,`<ResetPassword/>`, `<RecoverPassword/>`.
>3. **`<UserAdministration/>`** provides context for user administration logic like view,seach,disable,enable,modify users.
>

## UI Authentication components implementation in 4 steps using `<EmailPasswordContext/>`

>##Step 1 `<Login/>` component implementation

> This component is avalilable with npm `@authjs/react-ui-bootstrap` package

```javascript
import React from 'react'
import { EmailPasswordContext } from '@authjs/mern-react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import CustomInput from './CustomInput'
import AsyncButton from './AsyncButton'
const Login =()=>{
    return (<EmailPasswordContext.Consumer>
        {({email,password,login,onChange,validation,isLoggedIn,loading})=>{
            if(!isLoggedIn)
            return(
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6">
                        <fieldset>
                            <legend>Login:</legend>
                            <CustomInput placeholder="Email Address" name="email" type="email" value={email} onChange={onChange} validation={{ ...validation.email }} label="Email Address" />
                            <CustomInput placeholder="Password" name="password" type="password" value={password} onChange={onChange} validation={{ ...validation.password }} label="Password" />
                            <div>
                           <AsyncButton title="Login" onClick={login} loading={loading}/>
                            </div>
                            <Link to="/recover">Forgot Password !</Link>
                        </fieldset>
                    </div>
                </div>
            </div>
            )
            return <Redirect to="/" />
        }}
    </EmailPasswordContext.Consumer>)
}


export default Login
```

## Step 2 `<SignUp/>` component implementation.

> Description: UI component for user registration.

> > This component is avalilable with npm `@authjs/react-ui-bootstrap` package

```javascript
import React from 'react'
import { EmailPasswordContext } from '@authjs/mern-react'
import CustomInput from './CustomInput'
import {Redirect} from 'react-router-dom'
import AsyncButton from './AsyncButton'
const SignUp = () => {
    return (
        <EmailPasswordContext.Consumer>{({ onChange, email, password, signup,loading, validation, isLoggedIn }) => {
          if(!isLoggedIn)
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-6">
                            <fieldset>
                                <legend>Sign Up:</legend>
                                <CustomInput placeholder="Email Address" name="email" type="email" value={email} onChange={onChange} validation={{ ...validation.email }} label="Email Address" />
                                <CustomInput placeholder="Password" name="password" type="password" value={password} onChange={onChange} validation={{ ...validation.password }} label="Password" />
                                <div>
                                    <AsyncButton title="SignUp" onClick={signup} loading={loading}/>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            )
            return <Redirect to="/" />
        }}</EmailPasswordContext.Consumer>
    )
}

export default SignUp
```

## Step 3 `<ResetPassword/>` component implementation.

> Description: UI component for user password change.

> This component is avalilable with npm `@authjs/react-ui-bootstrap` package

```javascript
import React from 'react'
import { EmailPasswordContext } from '@authjs/mern-react'
import CustomInput from './CustomInput'
import AsyncButton from './AsyncButton'

const ResetPassword = () => {
    return (<EmailPasswordContext.Consumer>{({ password, confirm, resetPassword, validation,loading }) => {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6">
                        <fieldset>
                            <legend>Reset Password:</legend>
                            <CustomInput placeholder="New Password" name="password" type="password" value={password} onChange={onChange} validation={{ ...validation.password }} label="New Password" />
                            <CustomInput placeholder="Confirm Password" name="confirm" type="password" value={confirm} onChange={onChange} validation={{ ...validation.password }} label="Confirm" />
                            <div>
                           <AsyncButton title="Reset Password" onClick={resetPassword} loading={loading}/>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    }}</EmailPasswordContext.Consumer>)
}

export default ResetPassword
```

## Step 4 `<RecoverPassword/>` component implementation.

> Description: UI component for user password change request.Sends an email to the users mailbox for resetting password.

> This component is avalilable with npm `@authjs/react-ui-bootstrap` package

```javascript
import React from 'react'
import { EmailPasswordContext } from '@authjs/mern-react'
import CustomInput from './CustomInput'
import AsyncButtom from './AsyncButton'

const RecoverPassword = () => {
    return (
        <EmailPasswordContext.Consumer>{({ email, onChange, validation, recover,loading }) => {
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-6">
                            <fieldset>
                                <legend>Recover Password:</legend>
                                <CustomInput placeholder="Email Address" name="email" type="email" value={email} onChange={onChange} validation={{ ...validation.email }} label="Email Address" />
                                <div><AsyncButtom title="Recover Password" onClick={recover} loading={loading}/></div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            )
        }}</EmailPasswordContext.Consumer>
    )
}

export default RecoverPassword
```


## Users UI component implementation in 1 step using `<UserAdministration/>`

## Step 1 `<UserAdministration/>` component implementation.

> Description: UI component for Administrators for managing registered users. View,search,activate,disable,modify registered
>  users. 

```javascript
import React from 'react'
import { UserAdministration } from '@authjs/mern-react'
import EditUser from './EditUser'
import ConfirmationDialog from './ConfirmationDialog'
const Users = () => {
  return (<UserAdministration>{({ email, password, onChange, users, findUser, deleteUser, selectedUser, selectUser, validation }) => {
    console.log("selectedUser....", selectedUser)
    return (<div><UserTable users={users} findUser={findUser} deleteUser={deleteUser} selectUser={selectUser} />
      <EditUser selectedUser={selectedUser} validation={validation} onChange={onChange} password={password} email={email} />
      <ConfirmationDialog deleteOne={deleteUser} />
    </div>)
  }}</UserAdministration>)
}

export default Users


const UserTable = ({ users, selectUser }) => {

  return (<table className="table">
    <thead>
      <tr>
        <th scope="col">#_id</th>
        <th scope="col">Email</th>
        <th scope="col">Password</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>{users.map((u, i) => {
      return (<tr key={i}>
        <td>{u._id}</td>
        <td>{u.email}</td>
        <td>******************</td>
        <td><button data-toggle="modal" data-target="#exampleModal" onClick={() => { selectUser({ id: u._id }) }} className="btn btn-primary" >Edit</button></td>
        <td><button data-toggle="modal" data-target="#confirmationModal" onClick={() => { selectUser({ id: u._id }) }} className="btn btn-danger">Delete</button></td>
      </tr>)
    })}



    </tbody>
  </table>)
}
```

#Render Props passed down to children by `<EmailPasswordContext/>` provider component

| PropName      | type		        | defaul        | description|
|:------------- |:---------------:| -------------:|------------------:|
| login         | func            |       args:no | authenticates user|
| isLoggedIn    | bool            |         false | logged in state   |
| logout        | func            |        args:no| logs user out     |
| loading       | bool            |         false | authentication state     like logging in,logging out,signning up,resetting password|
|singup         |func             |        args:no|resgisters new user|
|resetPassword  |func             |        args:no|changes password   |
|recoverPassword|func             |        args:no|sends password reset link to user's mailbox
|email          |string           |            "" | prop passed to email input as a value
|password       |string           |            "" |prop passed to password input as a value
|confirm        |string           |            "" |props passed to confirm input as a value
|onChange       |func             |       args:no | handled by password,email,confirm inputs onChange event
|validation     |obj              |               | for input validation 
   
   

#Render Props passed down to children by `<UserAdministration/>` components

| PropName      | type		        | defaul        | description|
|:------------- |:---------------:| -------------:|------------------:|
| onChang       | func            |       args:no | authenticates user|
| selectedUser  | obj             |         false | logged in state   |
| validation    | obj             |        args:no| logs user out     |
| email         |string           |             ""|                   |
| password      |string           |             ""|                   |
| users         |array            |             []|                   |
| selectUser    |func             |               |                   |
| updateUser    |func             |               |                   |
| deleteUser    |func             |               |                   |
| findUser      |func             |               |                   |
