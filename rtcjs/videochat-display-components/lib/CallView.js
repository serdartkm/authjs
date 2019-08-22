import React from 'react'
import CallingAnimation from './CallingAnimation'

const style = {

    backgroundColor: "#eeeeee",
    overflow: "auto",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

};
const Calling = ({ signalingState,offer }) => {

    return (<div style={style}>
        <div>
            <div style={{ height: 120, width: 120, borderRadius: 60, backgroundColor: "#9e9e9e" }}></div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>{(signalingState === "have-local-offer" || offer !==null) && <CallingAnimation />}</div>
        </div>

    </div>)
}


export default Calling