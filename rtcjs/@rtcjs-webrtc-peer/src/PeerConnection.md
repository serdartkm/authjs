
```js
import React from 'react'
import SignalingService  from "@web-rtc/rtc-signaling";
import PeerConnection from "@web-rtc/rtc";
import VideoClientUI from "@web-rtc/rtc-ui";


const Client = ({clientOne,clientTwo})=>
<SignalingService
name={clientOne}
targetName={clientTwo}
serverUrl="ws://localhost:3000"
>
{signaling => {
  return (
    <PeerConnection {...signaling}>
      {context => {
        return (
          <VideoClientUI
            name="clientOne"
            targetName="clientTwo"
            {...context}
          />
        );
      }}
    </PeerConnection>
  );
}}
</SignalingService>
```

