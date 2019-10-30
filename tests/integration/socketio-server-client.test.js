const path = require('path')
require('dotenv').config({ path: path.join(__dirname, `./.env`) })//
const jwt = require('jsonwebtoken')

//client
import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'  //client

import io from "socket.io-client"; //client
import MessagingModuleSocket from '../../rtcjs/messaging-module-socket' //client
const serverURL = "http://localhost:3000/" //client


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
          debugger
          const { getByText,getAllByText ,getByPlaceholderText } = render(<MessagingModuleSocket name="mario" targetName="dragos" socket={client} />)
          //  fireEvent.change(getByPlaceholderText("Enter message text"), { target: { value: "Hello My Dear" } })
          client.on("text_message",(data)=>{
            debugger
          //  expect(getByText(/Hello My Dear/)).toBeVisible()

            done()
          })
      
          debugger
        } catch (error) {
          debugger
        }
      })

      dragosClient.onconnection((client) => {
        try {
          debugger
          const { getByText, getByPlaceholderText,getAllByPlaceholderText,getAllByText  } = render(<MessagingModuleSocket name="dragos" targetName="mario" socket={client} />)
          fireEvent.change(getAllByPlaceholderText("Enter message text")[1], { target: { value: "Hello My Dear" } })
          fireEvent.click(getAllByText("Send")[1])
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

