import {h} from 'preact'
import AppShell from '../../components/app-shell'

export default {
    title: "AppShell"
  };


export const appShell = () => {
  return (<AppShell 
  drawerItems={[{ route: "/first", title: "First Module" },{ route: "/second", title: "Second Module" }]}
  appTitle="Portfolio"
  routes={[{ path: "/first", load: () => import("./first-module") },{ path: "/second", load: () => import("./second-module") }]}
  />)
};


export const smartScroller =()=>{

    return  (<AppShell 
        drawerItems={[{ route: "/first", title: "First Module" },{ route: "/second", title: "Second Module" }]}
        appTitle="Portfolio"
        routes={[{ path: "/first", load: () => import("./first-module") },{ path: "/second", load: () => import("./second-module") }]}
        />)
}