import { h } from "preact";
import Router from "preact-router";
import AsyncRoute from "preact-async-route";
import {createHashHistory} from 'history'

const RouterComponent = ({routes}) => {
  return (
    <Router history={createHashHistory()}>
      {routes&& routes.map((route,i)=>{
        return(
          <AsyncRoute
            path={route.path}
            getComponent={() => route.load().then(module=> module.default)}
          />
        )
      })}
    </Router>
  );
};

export default RouterComponent
