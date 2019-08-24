import React from 'react'
import { sendMessage, useDataChannel,rtcStateUpdate,createOffer } from '@rtcjs/shareables-webrtc'


class WebRTCFileShareController extends React.Component {
    state = { file: "", currentChunk: 0, incomingFileInfo: "", incomingFileData: [], bytesRecieved: "", downloadInProgress: false, progress: 0, assembledFile: null, BYTES_PER_CHUNK: 1200 }



    componentDidMount() {

       console.log("WebRTCFileShare component didmount")
        const { currentChunk, downloadInProgress } = this.state
        const {initiator,sendOffer,sendCandidate}= this.props
        this.fileReader = new FileReader()

        this.fileReader.onload = () => {
            const { BYTES_PER_CHUNK } = this.state
            sendMessage({ self: this, message: this.fileReader.result })
            this.setState((prevState) => ({ currentChunk: prevState.currentChunk }))
            if (BYTES_PER_CHUNK * currentChunk < file.size) {
             this.readNextChunk();
            }
        }

      

        useDataChannel({
            self: this, onMessage: ({ message }) => {
                if (downloadInProgress === false) {
                 //   this.startDownload({ message })
                }
                else {
                 //   this.progressDownload({ message })
                }
            },
            sendCandidate
        })
        
        if (initiator) {

            console.log("is initiator")
            createOffer({
              self: this, sendOffer
            })
          }
    }
 
      componentWillUpdate(nextProps) {
        rtcStateUpdate({ self: this, nextProps, ...this.props, autoAnswer: true })
      } // END OF COMPONENT DID UPDATE
  

   //1.SELECT FILE
    onFileChange = (e) => {
        console.log("file e",e.target.files[0])
        this.setState({ file: e.target.files[0] })
        console.log("onFileChange triggered")
        const { file } = this.state
        this.setState({ currentChunk: 0 })
        const message = { fileName: file.name, fileSize: file.siz }
        sendMessage({ self: this, message })

     //   this.readNextChunk()

    }


    startDownload = ({ message }) => {

        this.setState({ incomingFileInfo: message, incomingFileData: [], bytesRecieved: 0, downloadInProgress: true })
        console.log("incoming file", this.state.incomingFileInfo.fileName)

    }

    progressDownload = ({ message }) => {
        
        const { bytesRecieved, incomingFileInfo } = this.state
        let progress = ((bytesRecieved / incomingFileInfo) * 100).toFixed(2)
        this.setState((prevState) => ({ bytesRecieved: message.byteLength, incomingFileData: prevState.incomingFileData.push(message), progress }))
        if (bytesRecieved === incomingFileInfo.fileSize) {
              this.endDownload()
        }
        console.log("download progress", progress)
        
    }
    endDownload = () => {
        
        const assembledFile = new Blob(this.state)
        this.setState({ downloadInProgress: false, assembledFile })
        
    }




    readNextChunk=()=>{
        const { currentChunk, file,BYTES_PER_CHUNK } = this.state
        let start = BYTES_PER_CHUNK * currentChunk
        let end = Math.min(file.size, start + BYTES_PER_CHUNK)
        this.fileReader.readAsBinaryString(file.slice(start,end))
    }


    
    render() {
      const { file,assembledFile} = this.state
      const { children } = this.props
        return (<div>{children({...this.props,...this.state, file, onFileChange: this.onFileChange,assembledFile })}</div>)
    }

}

export default WebRTCFileShareController