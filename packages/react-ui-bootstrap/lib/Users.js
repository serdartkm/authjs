import React from 'react'
import { UserAdministration } from '@authjs/mern-react'

const Users = () => {
  return (<UserAdministration>{({ users }) => {
    return <UserTable users={users} />
  }}</UserAdministration>)
}

export default Users


const UserTable = ({ users }) => {

  return (<table class="table">
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
        <td><button className="btn btn-primary">Edit</button></td>
        <td><button className="btn btn-danger">Delete</button></td>
      </tr>)
    })}



    </tbody>
  </table>)
}