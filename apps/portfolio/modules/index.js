import { h } from "preact";
import LazyScroller from "../../../components/lazy-scroller";

const ModuleComponent = () => {
    
  return <LazyScroller     dynamicItems={[
    { load: () => import("./socket-io-messaging/index") },
    { load: () => import("./webrtc-messaging/index") },
    { load: () => import("./webrtc-video-chat/index") }
  ]} />
};

export default ModuleComponent;


