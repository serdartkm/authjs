import React from 'react'

const TableHead = ({ children }) => {

    return (<thead>
        <tr>
            {children}
        </tr>
    </thead>)
}

export default TableHead