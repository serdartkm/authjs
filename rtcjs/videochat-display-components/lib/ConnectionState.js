import React from 'react'
const ConnectionState = ({signalingState,offer }) => {
  
    if (signalingState === "stable") {
        return <div style={{ color: "white", backgroundColor: "#81c784" }}>connected</div>
    }
    if(signalingState==="have-local-offer"){
        return <div style={{ color: "#000000", backgroundColor: "#81c784" }}>Waiting for answer...</div>
    }
    if(offer){
        return <div style={{ color: "#000000", backgroundColor: "#4fc3f7" }}>Please click answer button....</div>
    }
    else {
        return <div style={{ color: "#000000", backgroundColor: "#ff8f00" }}>Please  Click Call Button</div>
    }
}


export default ConnectionState