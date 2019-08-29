import React from 'react'
import { IconContext } from "react-icons";
const TransferCancelled = ({resetController}) => {

    return <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className="bg-warning">

        <IconContext.Provider value={{ color: "red", size: '5em' }}>
            <div>
              <button className="btn btn-outline-info" onClick={resetController}>Close</button>
            </div>
            <h5 className="text-danger"> Transfer Cancelled!</h5>
        </IconContext.Provider>
    </div>
}

export default TransferCancelled