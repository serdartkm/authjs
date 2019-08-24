import React from 'react'

class FileDownloader extends React.Component {

    constructor(props) {
        super(props)

        this.anchorRef = React.createRef()
    }

    componentDidMount() {
        const { assembledFile } = this.props
        if (assembledFile) {
            this.anchorRef.current.href = URL.createObjectURL(assembledFile)
        }
    }

    render() {

        return (<div style={{height:200, backgroundColor:"green"}}>
            <a ref={this.anchorRef}>Download file</a>
        </div>)
    }


}

export default FileDownloader