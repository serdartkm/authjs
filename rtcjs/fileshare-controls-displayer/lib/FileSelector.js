import React from 'react'

const style={
    height:"100%",
    width:"100%",

    display:"flex",
    justifyContent:"center",
    alignItems:"center"
}

class FileSelector extends React.Component {

    constructor(props) {
        super(props)
        this.fileInputRef = React.createRef()
    }

 


    upload=()=> {
        if(this.props.initiator){
            
            document.getElementById("selectFile").click()
        }
    
      
      }
    render() {
        const { onFileChange,setInitiator } = this.props
        return (<div style={style} className="bg-info">
                    <button className="btn btn-primary" onClick={this.upload}>Select File</button>
                    <input name="file"  onChange={onFileChange} hidden type="file" ref={this.fileInputRef} className="form-control-file" id="selectFile" className="visually-hidden" />
           
           
        </div>)
    }
}

export default FileSelector