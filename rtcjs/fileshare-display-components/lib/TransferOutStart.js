import React from 'react'
import CircularPercentageBar from './CircularPercentageBar'
import {MdFileUpload} from 'react-icons/md';
import {IconContext} from 'react-icons'
const TransferOutStart =({uploadProgress,cancelTransfer})=>{

    return (<div  style={{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center", display:"flex",flexDirection:"column"}} className="bg-info">
          <h3 style={{color:"white"}}>Sending ...</h3>
        <CircularPercentageBar percent={uploadProgress}/>
        <IconContext.Provider value={{ color: "#fafafa",size:'5em'}}>
              <div>
              <MdFileUpload/>
            </div>
            </IconContext.Provider>
            <button className="btn btn btn-info" onClick={cancelTransfer}>Cancel</button>
        </div> )
}

export default TransferOutStart