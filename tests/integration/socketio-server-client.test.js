const path = require('path')
require('dotenv').config({ path: path.join(__dirname, `./.env`) })//
const jwt = require('jsonwebtoken')

//client
import { render, fireEvent, cleanup } from '@testing-library/react'  //client
import io from "socket.io-client"; //client
import MessagingModuleSocket from '../../rtcjs/messaging-module-socket' //client
const serverURL = "http://localhost:3000/" //client

//const socketClientTwo = io(serverURL, { query: `name=dragos@gmail.com` }); //client
//server

const socketServer = require('../../rtcjs/socketio-server')({})



describe("INTEGRATION TESTING ", () => {

    describe("socketio server and client messaging", () => {//
     
        it("client to server message", async() => {
            debugger
            const token = await jwt.sign({ data: "aman" }, "mysecret", { expiresIn: '1h' })
            debugger
            socketServer.listen(3000)
            debugger
           const socketClient = io();
           debugger
           const client =require('../../__mocks__/socket.io-client')(token)

     
        })


    })
})

// token = await jwt.sign({ data: "aman" }, process.env.secret, { expiresIn: '1h' })