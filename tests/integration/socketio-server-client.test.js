const path = require('path')
require('dotenv').config({ path: path.join(__dirname, `./.env`) })//
const jwt = require('jsonwebtoken')

//client
import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'  //client
import {mount,configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactTestRenderer from 'react-test-renderer'

import io from "socket.io-client"; //client
import MessagingModuleSocket from '../../rtcjs/messaging-module-socket' //client
const serverURL = "http://localhost:3000/" //client

configure({adapter:new Adapter()})

describe("INTEGRATION TESTING ", () => {

  describe("socketio server and client messaging", () => {//

    it("client sever connection established with required params", async (done) => {
      const tokenMario = await jwt.sign({ data: "mario" }, "secret", { expiresIn: '1h' })
      const tokenDragos = await jwt.sign({ data: "dragos" }, "secret", { expiresIn: '1h' })
      const socketServer = require('../../rtcjs/socketio-server')({})
      const marioClient = io(tokenMario, "one");
      const dragosClient = io(tokenDragos, "two");

      marioClient.onconnection((client) => {
        debugger
        try {

          (()=>{

            debugger
          //  const { getByText, getByPlaceholderText } = render(<MessagingModuleSocket id={1} name="mario" targetName="dragos" socket={client} />)
             const testRenderer =ReactTestRenderer.create(<MessagingModuleSocket id={1} name="mario" targetName="dragos" socket={client} />)
            //fireEvent.change(getByPlaceholderText("Enter message text"), { target: { value: "Hello My Dear" } })
            client.on("text_message",(data)=>{
              testRenderer.update()
              debugger

               const jsonformat=     testRenderer.toJSON()
             // expect(getByText("Hello My Dear")).toBeVisible()
  
              done()
            })
          })()
      
        } catch (error) {
          debugger
        }
      })
      dragosClient.onconnection((client) => {
        try {

          (()=>{
      
            debugger
            const { getByTestId  } = render(<MessagingModuleSocket id={2} name="dragos" targetName="mario" socket={client} />)
            fireEvent.change(getByTestId(`message${2}`), { target: { value: "Hello My Dear" } })
            fireEvent.click(getByTestId(`sendMessage${2}`))
          })()
        
        } catch (error) {
          debugger
        }
        // expect(getByText("Hello My Dear")).toBeVisible()
      })

      socketServer.onconnection((socket) => {
        socket.join("mario")
        debugger


      })

 
    })


  })
})

