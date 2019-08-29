import React from 'react'
import { IconContext } from "react-icons";
import { MdDone } from "react-icons/md";
const TransferOutSuccess =({resetController})=>{

    return (<div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",height:"100%",width:"100%"}} className="bg-success">
        
        <IconContext.Provider value={{ color: "white",size:'5em'}}>
              <div>
              <MdDone />
            </div>
            </IconContext.Provider>

            <button onClick={resetController} className="btn btn-primary" >Ok</button>
        </div>)
}


export default TransferOutSuccess