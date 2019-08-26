import React from 'react'


class FileSelector extends React.Component {

    constructor(props) {
        super(props)
        this.fileInputRef = React.createRef()
    }

  
    render() {
        const { onFileChange } = this.props
        return (<div>FileSelector
            <form>
                <div className="form-group">
                    <label forhtml="exampleFormControlFile1">Example file input</label>
                    <input name="file"  onChange={onFileChange} type="file" ref={this.fileInputRef} className="form-control-file" id="exampleFormControlFile1" />
                </div>
            </form>
        </div>)
    }
}

export default FileSelector