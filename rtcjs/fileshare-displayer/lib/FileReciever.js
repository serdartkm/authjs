import React from 'react'
import { FileSelector, FileDownloader } from '@rtcjs/fileshare-controls-displayer'
import { TransferInStart, TransferCancelled } from '@rtcjs/fileshare-display-components'
const FileSender = (props) => {
  const { cancelled, start, downloadInProgress, transferIsComplete } = props
  if (cancelled) {

    return <TransferCancelled {...props} />
  } else
    if (start === 0 && downloadInProgress === false && transferIsComplete === false) {
      return <FileSelector {...props} />
    }
    else if (downloadInProgress) {
      return <TransferInStart {...props} />
    }

    else if (transferIsComplete) {
      return <FileDownloader {...props} />
    }
  return null
}


export default FileSender