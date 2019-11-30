import { h } from "preact";
import Router from "preact-router";
import AsyncRoute from "preact-async-route";

const RouterComponent = () => {
  return (
    <Router>
      <AsyncRoute
        path="/chatroom"
        getComponent={() => import("../ChatRoom").then(module => module.default)}
      />

    {/* <AsyncRoute
        path="/dynamic"
        getComponent={() => import("./SmartScroller").then(module => module.default)}
      /> */}

    </Router>
  );
};

export default RouterComponent
