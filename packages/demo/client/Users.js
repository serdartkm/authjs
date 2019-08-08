import React from 'react'
import {UserAdministration} from '@authjs/mern-react'

const Users =()=>{
return (<UserAdministration>{({users})=>{
    return (<div>users</div>)
}}</UserAdministration>)
}

export default Users