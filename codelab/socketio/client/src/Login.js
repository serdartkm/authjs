import React from 'react'

const Login =({login,username,onChange})=>{
    return (<div>
        <input name="username" value={username} type="text" onChange={onChange}/>
        <button disabled={username===""} onClick={login}>Login</button>
    </div>)
}


export default Login
