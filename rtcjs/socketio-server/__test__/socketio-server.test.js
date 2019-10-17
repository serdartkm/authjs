
jest.mock('http')
const socketClient =require('socket.io-client')
const express =require('express')
const http  =require('http')
const app = express()
const server = http.createServer(app);
const socketServer = require('../index')(server)
describe("INTEGRATION TESTING",()=>{
    describe("socketio-server",()=>{
        it('Mocking socket io',()=>{
       
        })
    })
})

