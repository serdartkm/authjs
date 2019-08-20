import React from 'react'

import CallBtn from './iconButtons/CallBtn'
import CallEndBtn from './iconButtons/CallEndBtn'
const VideoChatControlDisplayer =({offer,createOffer,createAnswer,closeCall,connectionState})=>{
  console.log("connectionState>>>>>>>>",connectionState)

    return (<div style={{ display:"flex",justifyContent:"center",width:"100%",position:"absolute",bottom:"5%", zIndex:2}}>
         {connectionState!=="connected" && offer===null &&<CallBtn onClick={createOffer} fill="green" value="Call"/>}
         {connectionState!=="connected" && offer!==null && <CallBtn onClick={createAnswer} fill="green" value ="Answer" />}
         {connectionState==="connected" &&<CallEndBtn onClick={closeCall} fill ="red" value="End"/>}
    </div>)
}


export default VideoChatControlDisplayer