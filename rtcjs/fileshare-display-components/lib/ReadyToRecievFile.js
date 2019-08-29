import React from 'react'

const ReadyToRecievFile =({closeTransfer})=>{

    return (<div style={{height:"100%", width:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}} className="bg-info">
        
        <h4>Waiting to recieve file...</h4>
        <button className="btn btn-info" onClick={closeTransfer}>Close</button>
        </div>)
}

export default ReadyToRecievFile


