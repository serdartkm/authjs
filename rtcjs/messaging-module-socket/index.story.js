import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { storiesOf } from '@storybook/react';
import MessagingModuleSocket from './index'
import io from "socket.io-client";
const serverURL = "http://localhost:3000/" 
const socket = io(serverURL, { query: `name=mario@gmail.com` });

localStorage.setItem("me","hello")


storiesOf('MessagingModuleSocket', module)
    .add('DefaultView', () => (
        <div>
          <MessagingModuleSocket targetName="dragos" socket={socket} name="mario" />
        </div>
    ))