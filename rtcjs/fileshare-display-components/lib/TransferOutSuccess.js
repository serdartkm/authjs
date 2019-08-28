import React from 'react'
import { IconContext } from "react-icons";
import { MdDone } from "react-icons/md";
const TransferOutSuccess =({resetController})=>{

    return (<div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",height:"100%",backgroundColor:"yellow",width:"100%"}}>
        
        <IconContext.Provider value={{ color: "green",size:'5em'}}>
              <div>
              <MdDone />
            </div>
            </IconContext.Provider>

            <button onClick={resetController} className="btn btn-outline-success" >Ok</button>
        </div>)
}


export default TransferOutSuccess