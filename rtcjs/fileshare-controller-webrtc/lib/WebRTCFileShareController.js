import React from 'react'
//import { sendMessage, useDataChannel } from '@rtcjs/shareables-webrtc'
//const BYTES_PER_CHUNK = 1200
/*
class WebRTCFileShareController extends React.Component {

    state = { file:"", currentChunk: 0, incomingFileInfo: "", incomingFileData: [], bytesRecieved: "", downloadInProgress: false, progress: 0,assembledFile:null }

    selectFile = (file) => {

        this.setState({ file })
    }

    componentDidMount() {
        const { currentChunk, downloadInProgress } = this.state
        this.fileReader = new FileReader()

        this.fileReader.onload = () => {
            sendMessage({ self: this, message: this.fileReader.result })
            this.setState((prevState) => ({ currentChunk: prevState.currentChunk }))
            if (BYTES_PER_CHUNK * currentChunk < file.size) {
                this.readNextChunk();
            }
        }

        useDataChannel({
            self: this, onMessage: ({ message }) => {
                if (downloadInProgress === false) {
                    this.startDownload({ message })
                }
                else {
                    this.progressDownload({ message })
                }
            }
        })
    }

    startDownload = ({ message }) => {
        this.setState({ incomingFileInfo: message, incomingFileData: [], bytesRecieved: 0, downloadInProgress: true })
        console.log("incoming file", this.state.incomingFileInfo.fileName)

    }

    progressDownload = ({ message }) => {
        const { bytesRecieved, incomingFileInfo } = this.state
        let progress = ((bytesRecieved / incomingFileInfo) * 100).toFixed(2)
        this.setState((prevState) => ({ bytesRecieved: message.byteLength, incomingFileData: prevState.incomingFileData.push(message), progress }))
           if(bytesRecieved===incomingFileInfo.fileSize){
               this.endDownload()
           }
        console.log("download progress", progress)
    }

    endDownload=()=>{
         const assembledFile= new Blob( this.state)
            this.setState({downloadInProgress:false,assembledFile})
    }

    readNextChunk = () => {
        const { currentChunk, file } = this.state
        let start = BYTES_PER_CHUNK * currentChunk
        let end = Math.min(file.size, start + BYTES_PER_CHUNK)
        this.fileReader.readAsArrayBuffer(file.slice(start, end))

    }

    onFileChange = () => {
        const { file } = this.state
        this.setState({ currentChunk: 0 })
        const message = { fileName: file.name, fileSize: file.siz }
        sendMessage({ self: this, message })

        this.readNextChunk()

    }
    

    render() {
      //  const { file,assembledFile } = this.state
      //  const { children } = this.props
        return (<div>
            WebRTCFileShareController
        
        </div>)
    }
}

export default WebRTCFileShareController

//  {children({ file, onFileChange: this.onFileChange,assembledFile })}

    */


