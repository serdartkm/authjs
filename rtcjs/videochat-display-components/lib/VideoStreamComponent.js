/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VideoStreamComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { mediaStream } = this.props;
    this.videoRef.current.srcObject = mediaStream;
  }

  componentDidUpdate() {
    const { mediaStream } = this.props;
    this.videoRef.current.srcObject = mediaStream;
  }

  render() {
    const { children } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          backgroundColor: 'brown',
          padding: 0,
          margin: 0,
          position: 'relative',
        }}
      >
        {' '}
        <video
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'brown',
            padding: 0,
            margin: 0,
          }}
          ref={this.videoRef}
          autoPlay
          playsInline
        >
          ddd
        </video>
        {children}
      </div>
    );
  }
}
VideoStreamComponent.propTypes = {
  mediaStream: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.element),
};
export default VideoStreamComponent;
