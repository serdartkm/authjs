import React from 'react';
import SignalingService from '@rtcjs/webrtc-signaling';
import PropTypes from 'prop-types';
import io from 'socket.io-client'

const SignalingDemo = () => (
  <div style={{ display: 'flex' }}>
    <div className="caller">
      <SignalingService
        name="clientOne"
        targetName="clientTwo"
        serverUrl="http://localhost:3000/"
      >
        {signaling => {
        
          return (
            <ClientComponent
              {...signaling}
              client="clientOne"
              targetName="clientTwo"
            />
          );
        }}
      </SignalingService>
    </div>
    <div className="callee">
      <SignalingService
        name="clientTwo"
        targetName="clientOne"
        serverUrl="http://localhost:3000/"
      >
        {signaling => (
          <ClientComponent
            {...signaling}
            client="clientTwo"
            targetName="clientOne"
          />
        )}
      </SignalingService>
    </div>
  </div>
);

const ClientComponent = ({
  offer,
  answer,
  candidate,
  sendOffer,
  sendAnswer,
  sendClose,
  sendCandidate,
  client,
  connected,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
    {client}
    <div className="connected">{connected ? 'connected' : 'disconnected'}</div>
    <div className="offer-video">{offer}</div>
    <div className="answer">{answer}</div>
    <div className="candidate">{candidate}</div>
    <button
      type="button"
      disabled={!connected}
      onClick={() => sendOffer(`video-offer from ${client}`, 'video-offer')}
      className="offerBtn"
    >
      sendOffer
    </button>
    <button
      type="button"
      disabled={!connected}
      onClick={() => sendAnswer(`video-answer from ${client}`, 'video-answer')}
      className="answerBtn"
    >
      sendAnswer
    </button>
    <button
      type="button"
      disabled={!connected}
      onClick={() => sendCandidate(`candidate from ${client}`, 'candidate')}
      className="candidateBtn"
    >
      sendCandidate
    </button>
    <button
      type="button"
      disabled={!connected}
      onClick={() =>
        sendClose(`close connection from ${client}`, 'close-connection')
      }
      className="closeBtn"
    >
      closeConnection
    </button>
  </div>
);

ClientComponent.propTypes = {

  sendOffer: PropTypes.func.isRequired,
  sendAnswer: PropTypes.func.isRequired,
  sendClose: PropTypes.func.isRequired,
  sendCandidate: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired,
};

export default SignalingDemo;
