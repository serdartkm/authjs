import React from 'react'
const TableRender = ({ collection=[],selectOne, headers=[], Table, TableBody, TableRow, TableColumn, TableFooter, TableHeader }) => {
   console.log("collection---",collection)
   return  (<Table>
            {TableHeader && <TableHeader>
                {headers.length===0 &&collection.length>0 && Object.keys(collection[0]).map((h, i) => {
                    return <TableColumn key={i}>{h}</TableColumn>
                })}
                {headers.length>0 && headers.map((h, i) => {
                    return <TableColumn key={i}>{h}</TableColumn>
                })}
            </TableHeader>}
            <TableBody>
                {collection !==undefined && collection.map((c, a) => {
                    return <TableRow selectOne={selectOne} _id={c._id} key={a}>{Object.keys(c).map((r, i) => {
                        return (<TableColumn key={i}>{c[r]}</TableColumn>)
                    })}</TableRow>
                })}
            </TableBody>
            {TableFooter && <TableFooter>
            </TableFooter>}
        </Table>)
   
    
}

export default TableRender

