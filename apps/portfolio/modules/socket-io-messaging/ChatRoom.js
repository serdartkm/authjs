import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import TabBar from "preact-material-components/TabBar";
import "preact-material-components/TabBar/style.css";
import "preact-material-components/Tabs/style.css";

import ChatUser from "./ChatUser";
import "./style.css";
import useSocketClient from "socket-io-messaging/useSocketClient";

const ChatRoom = () => {
  const [msgForMario, setMsgForMario] = useState(0);
  const [msgForDragos, setMsgForDragos] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);

  const {
    messages: msgMario,
    messageRecieved: msgRecMario,
    messageSent: msgSntMario,
    messageText: msgTxtMario,
    sendMessage: sendMsgMario,
    errors: errMario,
    connected: cntMario,
    handleMessageChange: hdleMessageChageMario,
    socket: marioSocket
  } = useSocketClient({
    name: "mario",
    targetName: "dragos",
    serverUrl:REACT_APP_SOCKET_URL,
    route:'/anonymous'
  
  });
  const {
    messages: msgDragos,
    messageRecieved: msgRecDragos,
    messageSent: msgSntDragos,
    messageText: msgTxtDragos,
    sendMessage: sendMsgDragos,
    errors: errDragos,
    connected: cntDragos,
    handleMessageChange: hdleMessageChageDragos,
    socket: dragosSocket
  } = useSocketClient({
    name: "dragos",
    targetName: "mario",
    serverUrl:REACT_APP_SOCKET_URL,
    route:'/anonymous'
  });

  useEffect(() => {
    if(msgForDragos !==null)
    setMsgForDragos(prevState => prevState + 1);
  }, [msgRecDragos]);
  useEffect(() => {
    if(msgForMario !==null)
    setMsgForMario(prevState => prevState + 1);
  }, [msgRecMario]);

  useEffect(() => {
    if (selectedItem === 0) {
      setMsgForMario(0);
    } else {
      setMsgForDragos(0);
    }
  }, [selectedItem]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="tab-bar">
        <div>
      <TabBar>
        <TabBar.Tab active onClick={() => setSelectedItem(0)}>
          <TabBar.TabLabel>
            <div style={{ display: "flex", alignItems: "center"}}>
              <div style={{ color: cntMario ? "green" : "orange"}}>mario</div>
              <div
                className="chip"
                style={{
                  backgroundColor: msgForMario > 0 ? "green" : "darkgrey"
                }}
              >
                {msgForMario}
              </div>
            </div>
          </TabBar.TabLabel>
        </TabBar.Tab>
        <TabBar.Tab onClick={() => setSelectedItem(1)}>
          <TabBar.TabLabel>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ color: cntDragos ? "green" : "orange" }}>
                dragos
              </div>
              <div
                className="chip"
                style={{
                  backgroundColor: msgForDragos > 0 ? "green" : "darkgrey"
                }}
              >
                {msgForDragos}
              </div>
            </div>
          </TabBar.TabLabel>
        </TabBar.Tab>
      </TabBar>
      </div>
      </div>
      {selectedItem === 0 && (
        <ChatUser
          handleMessageChange={hdleMessageChageMario}
          connected={cntMario}
          errors={errMario}
          messageSent={msgSntMario}
          messageText={msgTxtMario}
          messages={msgMario}
          sendMessage={sendMsgMario}
          messageRecieved={msgRecMario}
          socket={dragosSocket}
          name="mario"
          targetName="dragos"
        />
      )}
      {selectedItem === 1 && (
        <ChatUser
          handleMessageChange={hdleMessageChageDragos}
          connected={cntDragos}
          errors={errDragos}
          messageSent={msgSntDragos}
          messageText={msgTxtDragos}
          messages={msgDragos}
          sendMessage={sendMsgDragos}
          messageRecieved={msgRecDragos}
          socket={dragosSocket}
          name="dragos"
          targetName="mario"
        />
      )}
    </div>
  );
};
export default ChatRoom;
