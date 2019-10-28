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
            const  token = await jwt.sign({ data: "mario" }, "secret", { expiresIn: '1h' })
            debugger
            const socketServer = require('../../rtcjs/socketio-server')({})
            const socketClient = io(token,"mario");

            const {getByText,getByPlaceholderText}= render(<MessagingModuleSocket  name="mario" targetName="dragos" socket={socketClient}/>)
            fireEvent.change(getByPlaceholderText("Enter message text"),{target:{value:"Hello My Dear"}})
            fireEvent.click(getByText("Send"))
            expect(getByText("Hello My Dear")).toBeVisible()

            socketServer.on("connection", (socket) => {
                debugger
                socket.on("text_message",(data)=>{

                  debugger
                })
          //  socket.join("mario")
            // socket.to("mario").emit("text_message", { reciever: "dragos", datetime: "1", message: "hello dragos" })
              expect(socket.username).toBe("mario")
      

            })
done()
        })


    })
})

// token = await jwt.sign({ data: "aman" }, process.env.secret, { expiresIn: '1h' })