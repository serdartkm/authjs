/* eslint-disable import/no-named-as-default */
import { h } from "preact";
import { useState } from "preact/hooks";
import DrawerPage from "./DrawerPage";
import TopAppBar from "./TopAppBar";
// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-named-as-default-member
import RouterComponent from "./RouterComponent";


const AppShell = ({drawerItems,appTitle,routes}) => {
  const [toggle, setToggle] = useState(false);

  return [
    <DrawerPage open={toggle} setToggle={()=>setToggle(!toggle)} items={drawerItems} />,
    <TopAppBar toggle={toggle} setToggle={setToggle} title={appTitle} />,
    <RouterComponent routes={routes} />
  ];
};

export default AppShell;
