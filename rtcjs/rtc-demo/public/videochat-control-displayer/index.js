import React from 'react'
import CallBtn from './iconButtons/CallBtn'
import CallEndBtn from './iconButtons/CallEndBtn'

const style={
    display: "flex",
    justifyContent: "center",
    width: "100%",
    position: "absolute",  
    bottom: "5%", 
    zIndex: 2
}

const VideoChatControlDisplayer = ({ offer, createOffer, createAnswer, closeCall, signalingState }) => {

    return (<div style={style}>
        {signalingState !== "stable" && signalingState !== "have-local-offer" && offer === null && <CallBtn onClick={createOffer} fill="green" value="Call" />}
        {signalingState !== "stable" && offer !== null && <CallBtn onClick={createAnswer} fill="green" value="Answer" />}
        {signalingState === "stable" && <CallEndBtn onClick={closeCall} fill="red" value="End" />}
    </div>)
}

export default VideoChatControlDisplayer