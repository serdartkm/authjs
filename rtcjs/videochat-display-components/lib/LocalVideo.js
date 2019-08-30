import React from 'react'

const style = {
    
    backgroundColor: "yellow", //"#eeeeee",
    position:"absolute",
    height:"auto",
     top:25,
     right:5,
     width: 100,  
     padding: 0,
     margin: 0,
     zIndex:50
};


class LocalVideo extends React.Component{
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
      }
    
      componentDidMount() {
        const { localMediaStream } = this.props;
      
        this.videoRef.current.srcObject = localMediaStream;
      }
      componentWillUpdate(newProps){
      
        if(newProps.close){
          this.videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          this.videoRef.current.removeAttribute("srcObject");
        }
      }
      componentDidUpdate() {
        const { localMediaStream } = this.props;
        this.videoRef.current.srcObject = localMediaStream;
      }

      componentWillUpdate(newProps){
  
        if(newProps.closeConnection){
        //  this.videoRef.current.getTracks().forEach(track => track.stop());
   
         
        }
      }
render(){
    return( 
        <video
          style={style}
          ref={this.videoRef}
          autoPlay
          playsInline
        >
        
        </video>
    
    )
}
 
}


export default LocalVideo