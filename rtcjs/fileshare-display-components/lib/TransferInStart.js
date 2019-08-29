import React from 'react'
import CircularPercentageBar from './CircularPercentageBar'
import {MdFileDownload} from 'react-icons/md';
import { IconContext } from "react-icons";
const TransferInStart =({downloadProgress,cancelTransfer})=>{

    return (<div  style={{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center", display:"flex",flexDirection:"column"}} className="bg-info">
        <h3 style={{color:"white"}}>Reciving ...</h3>
        <CircularPercentageBar percent={downloadProgress}/>

        <IconContext.Provider value={{ color: "#fafafa",size:'5em'}}>
              <div>
              <MdFileDownload/>
            </div>
            </IconContext.Provider>
            <button className="btn btn-info" onClick={cancelTransfer}>Cancel</button>
        </div> )
}

export default TransferInStart