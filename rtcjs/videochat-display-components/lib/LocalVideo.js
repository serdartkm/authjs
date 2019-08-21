import React from 'react'

const style = {
    
    backgroundColor: "#eeeeee",
    overflow: "auto",
    width:100,
    height:100,
    flex:10,
    position:"absolute",
    right:5,
    top:5
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
    return( <div
        style={style}
      >
        {' '}
        <video
          style={{
            height: '100%',
            width: '100%',  
            padding: 0,
            margin: 0,
          }}
          ref={this.videoRef}
          autoPlay
          playsInline
        >
          ddd
        </video>
    
      </div>)
}
 
}


export default LocalVideo