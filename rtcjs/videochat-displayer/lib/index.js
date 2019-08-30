import React from 'react'
import { LocalVideo,RemoteVideo,CallView,ConnectionState} from '@rtcjs/videochat-display-components'
import VideoChatControlDisplayer from '@rtcjs/videochat-control-displayer'
const VideoChatDisplayer =(props)=>{

    return(<div style={{ width: "100%", height: "100%",position:"relative",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <ConnectionState {...props}/>
        {true&& <LocalVideo {...props}/>}
        {props.signalingState==="stable"&& <RemoteVideo {...props}/>}
        {props.signalingState!=="stable" &&<CallView {...props}/>}
        <VideoChatControlDisplayer {...props}/>
      
    </div>)
}


export default VideoChatDisplayer