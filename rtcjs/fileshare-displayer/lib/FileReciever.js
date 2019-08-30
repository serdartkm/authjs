import React from 'react'
import {FileDownloader } from '@rtcjs/fileshare-controls-displayer'
import { TransferInStart, TransferCancelled,ReadyToRecievFile } from '@rtcjs/fileshare-display-components'
const FileSender = (props) => {
  const { cancelled, transferIsComplete,connectionState,downloadProgress,incomingFileData } = props

  console.log("props after cancelled",props)
  if (cancelled) {

    return <TransferCancelled {...props} />
  }
  else
  if (connectionState==="connected" && downloadProgress ===0 ) {
    return <ReadyToRecievFile {...props} />
  }
    else if (!transferIsComplete) {
      return <TransferInStart {...props} />
    }

   
    else if (transferIsComplete) {
      return <FileDownloader {...props} />
    }
  return <div>Empty inside File Recievr</div>
}


export default FileSender