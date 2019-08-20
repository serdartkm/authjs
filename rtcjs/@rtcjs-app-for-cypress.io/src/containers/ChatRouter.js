import React from 'react';
// import  from 'webrtc-react-ui'
import VideoCallComponent, {
  AudioCallComponent,
  MessageChatComponent,
  DesktopShareComponent,
  FileShareComponent,
} from 'webrtc-react-ui';
// import {MessageChatComponent} from 'webrtc-react-ui'

import {
  VideoCamBtn,
  VoiceBtn,
  ChatBtn,
  ShareScreenBtn,
  AttachFileBtn,
  ContactsBtn,
} from 'webrtc-react-ui';
import { FirebaseListener } from 'webrtc-firebase-signaling';
import UserNamesContainer from './UserNamesContainer';

const style = {
  btn: {
    margin: 2,
  },
};

class ChatRouter extends React.Component {
  state = { route: 'contacts', calleeName: '' };

  setRoute = route => {
    if (route === 'contacts') {
      this.setState({ route, calleeName: '' });
    } else {
      this.setState({ route });
    }
  };

  selectCalleeName = calleeName => {
    this.setState({ calleeName, route: 'video' });
  };

  render() {
    const { route, calleeName } = this.state;
    const { width, height } = this.props;

    return (
      <div
        style={{
          height,
          width,
          backgroundColor: 'brown',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <FirebaseListener>
          {({ offer, close }) => (
            <div style={{ backgroundColor: '#8e24aa', flex: 1, width: '100%' }}>
              {(route === 'video' ||
                (offer &&
                  offer.type === 'video-offer' &&
                  close.mediaType !== 'video')) && (
                <VideoCallComponent route={route} callee={calleeName} />
              )}
              {(route === 'voice' ||
                (offer && offer.type === 'voice-offer')) && (
                <AudioCallComponent route={route} callee={calleeName} />
              )}
              {(route === 'message' ||
                (offer && offer.type === 'message-offer')) && (
                <MessageChatComponent route={route} callee={calleeName} />
              )}
              {route === 'screen' && (
                <DesktopShareComponent route={route} callee={calleeName} />
              )}
              {route === 'file' && (
                <FileShareComponent route={route} callee={calleeName} />
              )}
              {route === 'contacts' && !offer && (
                <UserNamesContainer selectCalleeName={this.selectCalleeName} />
              )}

              {(route !== 'contacts' || offer) && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <VideoCamBtn
                    fill="green"
                    onClick={() => this.setRoute('video')}
                  />
                  <VoiceBtn
                    fill="green"
                    onClick={() => this.setRoute('voice')}
                  />
                  <ChatBtn
                    fill="green"
                    onClick={() => this.setRoute('message')}
                  />
                  <ShareScreenBtn
                    fill="green"
                    onClick={() => this.setRoute('screen')}
                  />
                  <AttachFileBtn
                    fill="green"
                    onClick={() => this.setRoute('file')}
                  />
                  <ContactsBtn
                    fill="green"
                    onClick={() => this.setRoute('contacts')}
                  />
                </div>
              )}
            </div>
          )}
        </FirebaseListener>
      </div>
    );
  }
}

export default ChatRouter;

class Navigation extends React.Component {
  render() {
    const { setRoute } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <VideoCamBtn fill="green" onClick={() => setRoute('video')} />
        <VoiceBtn fill="green" onClick={() => setRoute('voice')} />
        <ChatBtn fill="green" onClick={() => setRoute('text')} />
        <ShareScreenBtn fill="green" onClick={() => setRoute('screen')} />
        <AttachFileBtn fill="green" onClick={() => setRoute('file')} />
        <ContactsBtn fill="green" onClick={() => setRoute('contacts')} />
      </div>
    );
  }
}

/* 
  <AudioCallComponent route={route}  callee={calleeName}>lll
                   <Navigation route="audio"  setRoute={this.setRoute}/>
                   </AudioCallComponent>
*/
