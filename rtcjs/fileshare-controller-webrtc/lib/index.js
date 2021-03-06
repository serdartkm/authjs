import React from 'react'
import { sendArrayBuffer, sendString, useDataChannel, rtcStateUpdate, createOffer, closeCall } from '@rtcjs/shareables-webrtc'

const initialState = {

    file: "",
    currentChunk: 0,
    incomingFileInfo: "",
    incomingFileData: [],
    bytesRecieved: 0,
    bytesSent: 0,
    downloadProgress: 0,
    uploadProgress: 0,
    transferIsComplete: false,
    assembledFile: null,
    BYTES_PER_CHUNK: 100,
    start: 0,
    end: 0,
    cancelled: false,
    initiator: false,
    connectionState: "",
    signalingState: ""
}

class WebRTCFileShareController extends React.Component {

    state = { ...initialState }

    componentDidMount() {
        //  const { downloadInProgress } = this.state
        this._ismounted = true;

        this.fileReader = new FileReader()

        this.fileReader.onloadend = (r) => {

            const { bytesRecieved, incomingFileInfo, cancelled } = this.state
            if (r.target.readyState == FileReader.DONE) {
                var buffer = r.target.result
                const { file, currentChunk, BYTES_PER_CHUNK } = this.state
                if (buffer.byteLength > 0 && cancelled === false) {
                    sendArrayBuffer({ self: this, message: r.target.result })
                    this.progressUpload(buffer)

                }
                if (Number.parseInt((BYTES_PER_CHUNK * currentChunk)) <= Number.parseInt(file.size) && cancelled === false) {
                    this.readNextChunk(file);
                    if (bytesRecieved === incomingFileInfo.fileSize) {
                        this.endDownload()
                    }

                }
            }
        }


        this.createDataChannel()

    }

    componentWillUpdate(nextProps) {
        if (this._ismounted = true) {

            rtcStateUpdate({ self: this, nextProps, ...this.props, autoAnswer: true })

            if (this.rtcPeerConnection === null) {
                this.createDataChannel()
            }
        }



    } // END OF COMPONENT DID UPDATE
    componentWillReceiveProps(props) {
        if (props.closeConnection != this.props.closeConnection && props.closeConnection === true) {
            this.resetController()
            closeCall({ self: this })
        }

    }

    componentWillUnmount() {
        this._ismounted = false;
        closeCall({ self: this })

        this.fileReader.onloadend=null
        this.fileReader=null
    }

    createDataChannel = () => {
        const { sendCandidate } = this.props
        useDataChannel({
            self: this, onMessage: (e) => {
                if (typeof (e.data) === "string") {
                    const { message } = JSON.parse(e.data)
                    if (message.type === "fileinfo") {

                        this.startDownload({ message })
                    }
                    else if (message.type === "cancel") {
                        console.log("cancel message recived")

                        this.setState({ cancelled: true })
                        // closeCall({self:this})
                    }


                }

                else {
                    this.progressDownload(e)

                }
            },
            sendCandidate
        })

    }

    onFileChange = (e) => {
        const { initiator } = this.state


        if (initiator) {
            if (e.target.files[0] !== null) {
                const file = e.target.files[0]
                this.setState({ file: e.target.files[0], currentChunk: 0 })
                const message = { fileName: file.name, fileSize: file.size, type: "fileinfo" }
                sendString({ self: this, message })
                this.readNextChunk(file)
            }
            else {
                console.log("file is null")
            }
        }
    }



    readNextChunk = (file) => {

        const { currentChunk, BYTES_PER_CHUNK } = this.state
        let startNew = BYTES_PER_CHUNK * currentChunk
        let endNew = Math.min(file.size, startNew + BYTES_PER_CHUNK)
        this.fileReader.readAsArrayBuffer(file.slice(startNew, endNew))
        this.setState({ start: startNew, end: endNew })
        this.setState((prevState) => ({ currentChunk: ++prevState.currentChunk }))
    }

    startDownload = ({ message }) => {

        this.setState({ incomingFileInfo: message, bytesRecieved: 0, cancelled: false })
    }

    progressDownload = (e) => {

        const { bytesRecieved, incomingFileInfo } = this.state
        let downloadProgress = (((bytesRecieved + e.data.byteLength) / incomingFileInfo.fileSize) * 100).toFixed()
        this.setState((prevState) => ({ bytesRecieved: e.data.byteLength + prevState.bytesRecieved, incomingFileData: [...prevState.incomingFileData, e.data], downloadProgress }))
        if ((bytesRecieved + e.data.byteLength) === incomingFileInfo.fileSize) {
            this.endDownload()
        }
    }

    progressUpload = (e) => {
        const { bytesSent, file } = this.state
        let uploadProgress = (((bytesSent + e.byteLength) / file.size) * 100).toFixed() > 0 && (((bytesSent + e.byteLength) / file.size) * 100).toFixed()
        this.setState((prevState) => ({ bytesSent: e.byteLength + prevState.bytesSent, uploadProgress }))
        if ((bytesSent + e.byteLength) === file.size) {
            this.setState({ transferIsComplete: true })
        }
    }

    endDownload = () => {

        const { incomingFileData } = this.state
        const assembledFile = new Blob(incomingFileData)
        this.setState({ assembledFile, transferIsComplete: true })
    }

    cancelTransfer = () => {
        const message = { type: "cancel" }
        sendString({ self: this, message })
        this.setState({ cancelled: true })
        //  closeCall({self:this})
        this.closeTransfer()
    }

    pauseTransfer = () => {

    }

    resumeTransfer = () => {

    }

    resetController = () => {
        this.setState((prevState) => ({ ...initialState, initiator: prevState.initiator }))
    }


    setInitiator = () => {
        const { sendOffer } = this.props


        //   this.createDataChannel()

        createOffer({
            self: this, sendOffer
        })
        this.setState({ initiator: true })

        console.log("initiator name", this.props.name)
    }

    closeTransfer = () => {

        this.setState({ ...initialState })
        this.props.sendClose()
        //  closeCall({self:this})

    }

    render() {

        const { children } = this.props

        console.log("this.state", this.state)
        return children({ ...this.props, ...this.state, onFileChange: this.onFileChange, cancelTransfer: this.cancelTransfer, resetController: this.resetController, setInitiator: this.setInitiator, closeTransfer: this.closeTransfer })
    }

}

export default WebRTCFileShareController