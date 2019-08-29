import React from 'react'
import FileReciver from './FileReciever'
import FileSender from './FileSender'
import { FileSelector } from '@rtcjs/fileshare-controls-displayer'
import {InitiateFileSending} from '@rtcjs/fileshare-display-components'
const FileShareDisplayer =(props)=>{

  const {connectionState,initiator,uploadProgress}= props

  if(connectionState !=="connected"){
   return <InitiateFileSending {...props}/>
  }

  else if(connectionState ==="connected" && uploadProgress===0 && initiator){
    return <FileSelector {...props}/>
  }
  else
  if( connectionState ==="connected" &&  uploadProgress >0 && initiator){
 
    return <FileSender {...props}/>
  }

 
  else if(!initiator && connectionState ==="connected"){
 
    return <FileReciver {...props}/>
  }



 
  return <div>Unknown</div>

  
}


export default FileShareDisplayer