import { h } from "preact";
import SmartScroller from "../../../components/smart-scroller";

const ModuleComponent = () => {
    
  return <SmartScroller     dynamicItems={[
    { load: () => import("./socket-io-messaging/index") },
    { load: () => import("./webrtc-messaging/index") },
    { load: () => import("./webrtc-video-chat/index") }
  ]} />
};

export default ModuleComponent;

// import React from 'react'
// import TimeLine from './TimeLine'
// import data from './data'
// const Modules =()=>{
//     return (<div>Modules

//         <TimeLine data={data}/>
//     </div>)
// }

// export default Modules
