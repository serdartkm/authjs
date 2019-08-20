import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import ErrorBoundary from "./ErrorBoundary";
import E2EDemo from './examples/E2EDemo';
import SignalingDemo from './examples/SignalingDemo';
import ContactsDemo from './examples/ContactsDemo'
import PeerTextChatDemo  from './examples/PeerTextChatDemo'
function AppRouter() {
  return (
    <Router>
      <div style={{display:"flex"}}>
        <nav>
          <ul>
            <li>
              <Link to="/">E2EDemo</Link>
            </li>
            <li>
              <Link to="/nodejssingnaling">SignalingDemo</Link>
            </li>
            <li>
              <Link to="/contacts">ContactsDemo</Link>
            </li>
            <li>
              <Link to="/textchat">PeerTextChatDemo</Link>
            </li>
          </ul>
        </nav>
<div>
<Route path="/" exact component={E2EDemo} />
        <Route path="/nodejssingnaling" component={SignalingDemo} />
        <Route path="/contacts" component={ContactsDemo} />
        <Route path="/textchat" component={PeerTextChatDemo} />
</div>
        
      </div>
    </Router>
  );
}

ReactDOM.render(
  <div>
    <AppRouter />
  </div>,
  document.getElementById('root')
);
