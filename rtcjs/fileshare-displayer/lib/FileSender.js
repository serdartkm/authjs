import React from 'react'
import { TransferOutSuccess, TransferOutStart, TransferCancelled } from '@rtcjs/fileshare-display-components'
const FileSender = (props) => {
  const {cancelled,transferIsComplete} = props

  if (cancelled) {
    return <TransferCancelled {...props}/>
  }
    else if (!transferIsComplete) {
      return <TransferOutStart {...props} />
    }
    else if (transferIsComplete) {
      return <TransferOutSuccess {...props} />
    }

  return <div>FileSender</div>
}


export default FileSender