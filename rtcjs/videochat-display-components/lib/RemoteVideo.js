import React from 'react'
const style = {

  backgroundColor: "#eeeeee",
  overflow: "auto",
  width: "100%",
  height: "100%",
  // display:"flex",
  // justifyContent:"center",

};

class RemoteVideo extends React.Component {
  constructor(props) {
    super(props);
    this.remoteVideoRef = React.createRef();
  }

  componentDidMount() {
    const { remoteMediaStream } = this.props;

    this.remoteVideoRef.current.srcObject = remoteMediaStream;


  }
  
  componentDidUpdate() {
    const { remoteMediaStream } = this.props;
    this.remoteVideoRef.current.srcObject = remoteMediaStream;
  }
  render() {
    return (
      <div style={{height:"100%",width:"25vh",display:"flex",justifyContent:"center",aligntItems:"center",position:"relative", backgroundColor:"green"}}>
      <video
        style={{
          height: 'auto',
          width: '25vh',
          flex: 1,
          //  backgroundColor: 'brown',
          padding: 0,
          margin: 0,
          position:"ansolute"
        }}
        ref={this.remoteVideoRef}
        autoPlay
        playsInline
      >
            </video></div>)
  }

}

export default RemoteVideo