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
    return (<div
      style={style}
    >
      {' '}
      <video
        style={{
          height: '100%',
          width: '100%',
          flex: 1,
          //  backgroundColor: 'brown',
          padding: 0,
          margin: 0,
        }}
        ref={this.remoteVideoRef}
        autoPlay
        playsInline
      >
        ddd
            </video>

    </div>)
  }

}

export default RemoteVideo