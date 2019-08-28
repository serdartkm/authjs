import React from 'react'
import { MdCancel } from 'react-icons/md';
import { IconContext } from "react-icons";
const TransferCancelled = ({resetController}) => {

    return <div style={{ height: "100%", backgroundColor: "yellow", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

        <IconContext.Provider value={{ color: "red", size: '5em' }}>
            <div>
              <button className="btn btn-outline-info" onClick={resetController}>Close</button>
            </div>
            <h4> Transfer Cancelled</h4>
        </IconContext.Provider>
    </div>
}

export default TransferCancelled