import React from 'react'
import CircularPercentageBar from './CircularPercentageBar'
import {MdFileDownload} from 'react-icons/md';
import { IconContext } from "react-icons";
const TransferInStart =({downloadProgress,cancelTransfer})=>{

    return (<div  style={{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"green" , display:"flex",flexDirection:"column"}}>
        <h3>Reciving ...</h3>
        <CircularPercentageBar percent={downloadProgress}/>

        <IconContext.Provider value={{ color: "blue",size:'5em'}}>
              <div>
              <MdFileDownload/>
            </div>
            </IconContext.Provider>
            <button className="btn btn-outline-danger" onClick={cancelTransfer}>Cancel</button>
        </div> )
}

export default TransferInStart