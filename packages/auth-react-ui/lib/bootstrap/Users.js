import React from 'react'
import EditorReact from '@xaf/editor-react'
import {BootstrapForm,BootstrapConfirmation} from '@xaf/bootstrap-dialog'
import {BootstrapTable}  from '@xaf/bootstrap-table'

const initialState = {
  users: [],
  email: "", password: "", _id: ""
}
const headers =["_id","Password","Email","Edit","Delete"]
const Users = ({collection,db}) => {
      
  return (<EditorReact collection={collection} db={db} initialState={initialState}>{({state, deleteOne, selectOne }) => {
    const users =state.objects.map((u)=>{return {...u, password:"********" }})
  return (<div><BootstrapTable  headers={headers} collection={users} selectOne={selectOne} />
  <BootstrapForm modalId="form">xxx</BootstrapForm>
  <BootstrapConfirmation confirm={deleteOne} decline={()=>{}} modalId="confirm">Confirm deletion of: {state.selectedObject && state.selectedObject.email }</BootstrapConfirmation>
  </div>)
  }}</EditorReact>)
}

export default Users
/*
    <EditUser {...state} validation={validation} onChange={onChange}  />
      <ConfirmationDialog deleteOne={deleteOne} />
*/
