import React from "react";
import TextChatProvider from "@rtcjs/peer-text-chat";
import { ChatView } from "@rtcjs/ui";
import io from "socket.io-client";

const style = {
  root: {
      marginLeft:100,
    display: "flex",
    justifyContent:"center"
  },
  JamsChatView: {
      marginRight:20
  },
  DamsChatView: {}
};

class PeerTextChatDemo extends React.Component {
  componentWillMount() {
    this.socketJam = io("http://localhost:3000/", { query: `name=Jam` });
    this.socketDam = io("http://localhost:3000/", { query: `name=Dam` });

  }

  render() {
    
    return (
      <div style={style.root}>
        <div style={style.JamsChatView}>
          <TextChatProvider webrtc={false}  name="Jam" targetName="Dam" socket={this.socketJam}>
            <ChatView/>
          </TextChatProvider>
        </div>{" "}
        <div style={style.DamsChatView}>
          <TextChatProvider  webrtc={false} name="Dam" targetName="Jam" socket={this.socketDam}>
            <ChatView/>
          </TextChatProvider>
        </div>
      </div>
    );
  }
}

export default PeerTextChatDemo;
