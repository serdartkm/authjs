import { h } from "preact";
import { useState } from "preact/hooks";
import TabBar from "preact-material-components/TabBar";
import "preact-material-components/TabBar/style.css";
import "preact-material-components/Tabs/style.css";
import LayoutGrid from "preact-material-components/LayoutGrid";
import "preact-material-components/LayoutGrid/style.css";
import ChatUser from "./ChatUser";
import "./style.css";

const ChatRoom = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <div style={{ width: "100%", height: "100%"}}>
      <TabBar>
        <TabBar.Tab active onClick={() => setSelectedItem(0)}>
          <TabBar.TabLabel>Client 1</TabBar.TabLabel>
        </TabBar.Tab>
        <TabBar.Tab onClick={() => setSelectedItem(1)}>
          <TabBar.TabLabel>Client 2</TabBar.TabLabel>
        </TabBar.Tab>
      </TabBar>
      {selectedItem === 0 && <ChatUser name="mario" targetName="dragos" />}
      {selectedItem === 1 && <ChatUser name="dragos" targetName="mario" />}
    </div>
  );
};
export default ChatRoom;
