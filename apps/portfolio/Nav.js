import {h} from 'preact'
import Router from 'preact-router'
import AsyncRoute from 'preact-async-route'

const Nav =()=>{
return(
<div>Nav
<a href="/chatroom">chat room</a>
<Router>
<AsyncRoute path="/chatroom" 
getComponent ={()=> import('./ChatRoom').then(module=> module.default)}
/>
</Router>
</div>
)
}


export default Nav