const path = require('path')
require('dotenv').config({ path: path.join(__dirname, `./.env`) })//
const jwt = require('jsonwebtoken')

//client
import { render, fireEvent, cleanup } from '@testing-library/react'  //client
import io from "socket.io-client"; //client
import MessagingModuleSocket from '../../rtcjs/messaging-module-socket' //client
const serverURL = "http://localhost:3000/" //client


describe("INTEGRATION TESTING ", () => {

    describe("socketio server and client messaging", () => {//

        it("client sever connection established with required params", (done) => {

            const socketServer = require('../../rtcjs/socketio-server')({})
            const socketClient = io("mario");
            socketServer.on("connection", (socket) => {
            socket.join("mario")
               // socket.to("mario").emit("text_message", { reciever: "dragos", datetime: "1", message: "hello dragos" })
              expect(socket.username).toBe("mario")
      

            })

        })


    })
})

// token = await jwt.sign({ data: "aman" }, process.env.secret, { expiresIn: '1h' })