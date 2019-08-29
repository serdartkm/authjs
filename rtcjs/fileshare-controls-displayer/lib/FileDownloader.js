import React from 'react'
import { IconContext } from "react-icons";
import { MdDone } from "react-icons/md";
class FileDownloader extends React.Component {

    constructor(props) {
        super(props)

        this.anchorRef = React.createRef()
    }

    componentDidMount() {
        const { assembledFile, incomingFileInfo } = this.props

        if (assembledFile) {


            this.anchorRef.current.href = URL.createObjectURL(assembledFile)

            this.anchorRef.current.download = incomingFileInfo.fileName

        }

    }


    render() {
        const {resetController}= this.props
        return (<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100%", width: "100%" }}  className="bg-success">

            <IconContext.Provider value={{ color: "white", size: '5em' }}>
                <div>
                    <MdDone />
                </div>
            </IconContext.Provider>
            <a className="btn btn-primary" ref={this.anchorRef} onClick={resetController}>Download file</a>
        </div>)
    }


}

export default FileDownloader



