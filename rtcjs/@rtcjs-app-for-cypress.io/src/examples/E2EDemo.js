import React from 'react';
import SignalingService, { UserIDGenerator } from '@rtcjs/webrtc-signaling';
import PeerConnection from '@rtcjs/webrtc-peer';
import VideoClientUI from '@rtcjs/ui';
import io from 'socket.io-client'

const E2EDemo = () => (
  <div style={{ display: 'flex' }}>
    <div className="caller">
      <SignalingService
           serverUrl="http://localhost:3000/"
        name="clientOne"
        targetName="clientTwo"
      >
        {signaling => (
          <PeerConnection {...signaling}>
            {context => (
              <VideoClientUI
                name="clientOne"
                targetName="clientTwo"
                {...context}
              />
            )}
          </PeerConnection>
        )}
      </SignalingService>
    </div>
    <div className="callee">
      <SignalingService
        name="clientTwo"
        targetName="clientOne"
        serverUrl="http://localhost:3000/"
      >
        {signaling => (
          <PeerConnection {...signaling}>
            {context => (
              <VideoClientUI
                name="clientTwo"
                targetName="clientOne"
                {...context}
              />
            )}
          </PeerConnection>
        )}
      </SignalingService>
    </div>
  </div>
);
export default E2EDemo;
