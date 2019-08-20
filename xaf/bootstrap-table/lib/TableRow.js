import React from 'react'

const TableRow =({children,selectOne,_id})=>{
   console.log("_id-----",_id)
    return (<tr>
          {children}
          <td><button data-toggle="modal" data-target="#form" onClick={() => { selectOne({_id}) }} className="btn btn-primary" >Edit</button></td>
          <td><button data-toggle="modal" data-target="#confirm" onClick={() => { selectOne({_id}) }} className="btn btn-danger">Delete</button></td>
    </tr>)
}

export default TableRow