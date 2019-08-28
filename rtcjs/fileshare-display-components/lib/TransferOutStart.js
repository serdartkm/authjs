import React from 'react'
import CircularPercentageBar from './CircularPercentageBar'
import {MdFileUpload} from 'react-icons/md';
import {IconContext} from 'react-icons'
const TransferOutStart =({uploadProgress,cancelTransfer})=>{

    return (<div  style={{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"green", display:"flex",flexDirection:"column"}}>
          <h3>Sending ...</h3>
        <CircularPercentageBar percent={uploadProgress}/>
        <IconContext.Provider value={{ color: "blue",size:'5em'}}>
              <div>
              <MdFileUpload/>
            </div>
            </IconContext.Provider>
            <button className="btn btn-outline-danger" onClick={cancelTransfer}>Cancel</button>
        </div> )
}

export default TransferOutStart