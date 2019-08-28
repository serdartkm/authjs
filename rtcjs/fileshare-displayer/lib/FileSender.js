import React from 'react'
import { FileSelector } from '@rtcjs/fileshare-controls-displayer'
import { TransferOutSuccess, TransferOutStart, TransferCancelled } from '@rtcjs/fileshare-display-components'
const FileSender = (props) => {
  const {cancelled,start,uploadInProgress,transferIsComplete} = props
  if (cancelled) {

    return <TransferCancelled {...props}/>
  }
  else
    if (start === 0) {
      return <FileSelector {...props} />
    }
    else if (uploadInProgress) {
      return <TransferOutStart {...props} />
    }

    else if (transferIsComplete) {
      return <TransferOutSuccess {...props} />
    }

  return null
}


export default FileSender