import React from 'react'
import FileReciver from './FileReciever'
import FileSender from './FileSender'



const FileShareDisplayer =(props)=>{

  if(props.initiator){
    return <FileSender {...props}/>
  }
  else if(!props.initiator){
    return <FileReciver {...props}/>
  }
  return null

  
}


export default FileShareDisplayer