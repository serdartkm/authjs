import React from 'react'

const InitiateFileSending =({setInitiator})=>{

    return (<div style ={{display:"flex",justifyContent:"center", height:"100%",width:"100%", alignItems:"center"}} className="bg-info">
        <button className="btn btn-info" onClick={setInitiator}>Connect</button>
    </div>)
}

export default InitiateFileSending