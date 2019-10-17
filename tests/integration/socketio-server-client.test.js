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
jest.mock('http')
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app);
const socketServer = require('../../rtcjs/socketio-server')(server)
server.listen("100")//
describe("INTEGRATION TESTING ", () => {

    describe("socketio server and client messaging", () => {//
        let token = ''
        beforeEach(async () => {
            token = await jwt.sign({ data: "aman" }, process.env.secret, { expiresIn: '1h' })

        })
        it("client to server message", (done) => {
            let handshake = { query: { token } }
            const socketClientOne = io(handshake); //client/
            socketClientOne.emit("text_message", { reciever: "mario", datetime: "1", message: "first message" })
            done()//
        })

        it("server to client massage", () => {



        })



    })
})