import React from 'react'
import { sendArrayBuffer,sendString, useDataChannel, rtcStateUpdate, createOffer } from '@rtcjs/shareables-webrtc'


class WebRTCFileShareController extends React.Component {
    state = { file: "", currentChunk: 0, incomingFileInfo: "", incomingFileData: [], bytesRecieved: "", downloadInProgress: false, progress: 0, assembledFile: null, BYTES_PER_CHUNK: 50, start: 0, end: 0 }



    componentDidMount() {
        const { downloadInProgress } = this.state
        const { initiator, sendOffer, sendCandidate } = this.props
  


        this.fileReader = new FileReader()

        this.fileReader.onloadend = (r) => {
            if (r.target.readyState == FileReader.DONE) {
            var buffer = r.target.result
            const { file,currentChunk,BYTES_PER_CHUNK } = this.state
            // console.log("5..readNextChunk-----",file)

           // console.log("r.target.result------.........", typeof( r.target.result))
                if(buffer.byteLength>0){
              
                    sendArrayBuffer({ self: this, message: r.target.result })
               
                }
          

            if (Number.parseInt((BYTES_PER_CHUNK * currentChunk)) < Number.parseInt( file.size) ) {

            //    console.log("BYTES_PER_CHUNK??????????????",BYTES_PER_CHUNK)
             //   console.log("currentChunk????????????",currentChunk)
             //   console.log("file.size????????????",BYTES_PER_CHUNK * currentChunk,file.size)
             //   console.log("BYTES_PER_CHUNK * currentChunk < file.size",BYTES_PER_CHUNK * currentChunk < file.size)
       
                this.readNextChunk(file);
         
           
            }
        }}


        useDataChannel({
            self: this, onMessage: (e) => {
                console.log("message recived-----", e)
              
             //console.log("message--is--", JSON.parse( e.data))
                if (downloadInProgress === false && typeof(e.data)==="string") {
                    const { message } = JSON.parse( e.data)
                    console.log('3. Recieved file info',message)
                    this.startDownload({ message })
                }
                else {
                   console.log("6. File chunk recieved", e)
                 //   this.progressDownload(e)
                }
            },
            sendCandidate
        })
 
      
        if (initiator) {


            createOffer({
                self: this, sendOffer
            })
        }
    }

    componentWillUpdate(nextProps) {
      //  console.log("nextProps-----", nextProps)
        rtcStateUpdate({ self: this, nextProps, ...this.props, autoAnswer: true })
    } // END OF COMPONENT DID UPDATE

    //1.SELECT FILE (SENDING FILE)
    onFileChange = (e) => {
    
        if (e.target.files[0] !== null) {
            const file = e.target.files[0]
             console.log("1.Selecting file...:", file)
            this.setState({ file: e.target.files[0], currentChunk: 0 })

            const message = { fileName: file.name, fileSize: file.size, type: "fileinfo" }

            console.log("2.Sending file info...:", message)
            sendString({ self: this, message })
          //  console.log('slice>>>>>>>>>>>', file.slice(0, 100))
            this.readNextChunk(file)

        }
        else {
            console.log("file is null")
        }
    }


    //2.CHUNKING FILE
    //3.READ INTO MEMORY CHANKED DATA
    readNextChunk = (file) => {
      //  console.log("8.Readnext chunk",file)
        const { currentChunk, BYTES_PER_CHUNK, start, end } = this.state
       // console.log("CURRENT CHUNK", currentChunk)
       // console.log("BYTES_PER_CHUNK", BYTES_PER_CHUNK)
       // console.log("FILE SIZE", file.size)
        let startNew = BYTES_PER_CHUNK * currentChunk
        let endNew = Math.min(file.size, startNew + BYTES_PER_CHUNK)
        this.setState({ start: startNew, end: endNew })
       // console.log('FILE---start,end', start, end)

        this.fileReader.readAsArrayBuffer(file.slice(start, end))
        this.setState((prevState) => ({ currentChunk: ++prevState.currentChunk }))
    }

    startDownload = ({ message }) => {
         console.log("4.Set initial file info fileinfo...:", message)
        this.setState({ incomingFileInfo: message, bytesRecieved: 0, downloadInProgress: true })


    }

    progressDownload = (e) => {
       console.log('7.Process file chunk recieved', e.data)
        const { bytesRecieved, incomingFileInfo } = this.state
        let progress = ((bytesRecieved / incomingFileInfo) * 100).toFixed(2)
        this.setState((prevState) => ({ bytesRecieved: e.data.byteLength, incomingFileData: [...prevState.incomingFileData, e.data], progress }))
        if (bytesRecieved === incomingFileInfo.fileSize) {
            this.endDownload()
        }
        //  console.log("download progress", progress)

    }
    endDownload = () => {

        //  const assembledFile = new Blob(this.state)
        this.setState({ downloadInProgress: false })

    }
  

  

    render() {
        const { file, assembledFile } = this.state


        const { children } = this.props
        return (<div>{children({ ...this.props, ...this.state, file, onFileChange: this.onFileChange, assembledFile })}</div>)
    }

}

export default WebRTCFileShareController