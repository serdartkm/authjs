import React, { Fragment } from "react";
import { render } from "react-dom";
 
import { Timeline, Event } from "react-timeline-scribble";
 
const App = () => (
  <Fragment>
    <h1>CodeLab Playground</h1>
    <Timeline>
      <Event interval={"2016 – 2018"} title={"Lorem"} subtitle={"Ipsum"}>
        dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
        id est laborum.
        <img src="img/calculator.png" width="100" />
      </Event>
      <Event interval={"2015 – 2016"} title={"Lorem"} subtitle={"Ipsum"}>
        dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
        id est laborum.
      </Event>
    </Timeline>
  </Fragment>
);

export default App