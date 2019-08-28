import React from 'react'
import { IconContext } from "react-icons";
import { MdDone } from "react-icons/md";
const TransferSuccess =()=>{

    return (<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",backgroundColor:"yellow",width:"100%"}}>
        
        <IconContext.Provider value={{ color: "green",size:'5em'}}>
              <div>
              <MdDone />
            </div>
            </IconContext.Provider>
        </div>)
}


export default TransferSuccess