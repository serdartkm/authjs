/* eslint-disable import/no-named-as-default */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import DrawerPage from "./DrawerPage";
import TopAppBar from "./TopAppBar";
// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-named-as-default-member
import RouterComponent from "./RouterComponent";
import SmartScroller from "./SmartScroller";

const AppShell = ({children}) => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", e => {});
  }, []);
  return [
    <DrawerPage open={toggle} setToggle={setToggle} />,
    <TopAppBar toggle={toggle} setToggle={setToggle} />,
    {children}
    <SmartScroller
      dynamicItems={[
        { load: () => import("./ContentOne") },
        { load: () => import("../contents/ContentTwo") },
        { load: () => import("../contents/ContentThree") }
      ]}
    />
  ];
};

export default AppShell;
